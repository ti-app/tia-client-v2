import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';

import MapView from '../../shared/Map/MapView/MapView';
import TreeMarker from '../../shared/Map/Tree/Tree';
import TreeClusterMarker from '../../shared/Map/TreeCluster/TreeCluster';
import AddPanel from './AddPanel';

import styles from './AddScreen.style';
import variables from '../../../theme/variables';
import { goToMapLocation } from '../../utils/geo';
import { usePrevious, useKeyboardHideHook, useSnackbar } from '../../utils/customHooks';

import * as locationActions from '../../store/actions/location.action';
import * as treeActions from '../../store/actions/tree.action';
import {
	selectMainMapCenter,
	selectSearchedLocations,
	selectUserLocation,
} from '../../store/reducers/location.reducer';
import { useDispatch, useSelector } from 'react-redux';
import AutoCompleteSearch from '../../shared/AutoCompleteSearch/AutoCompleteSearch';
import { selectTreeGroups } from '../../store/reducers/tree.reducer';
import logger from '../../utils/logger';
import { getLocationForGooglePlaceId } from '../../utils/google-api';
const AddScreen = () => {
	const [mapRef, setMapRef] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const mapCenter = useSelector(selectMainMapCenter);
	const userLocation = useSelector(selectUserLocation);
	const searchedLocations = useSelector(selectSearchedLocations);
	const treeGroups = useSelector(selectTreeGroups);
	const [isKeyboardOpen] = useKeyboardHideHook();

	const { showSnackbar, hideSnackbar } = useSnackbar();

	const prevMapCenter = usePrevious(mapCenter);

	const dispatch = useDispatch();
	const fetchUserLocation = useCallback(() => dispatch(locationActions.fetchUserLocation()), [
		dispatch,
	]);
	const setMainMapCenter = useCallback(
		(...param) => dispatch(locationActions.setMainMapCenter(...param)),
		[dispatch]
	);
	const fetchTreeGroups = useCallback(
		(...param) => dispatch(treeActions.fetchTreeGroups(...param)),
		[dispatch]
	);
	const fetchSearchedLocations = useCallback(
		(_searchQuery) => dispatch(locationActions.fetchSearchedLocation(_searchQuery)),
		[dispatch]
	);

	const addSheetRef = useRef();

	useEffect(() => {
		fetchUserLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * When user location changes
	 *  Navigate map to the user location
	 *  Set Map Center state
	 */
	useEffect(() => {
		if (userLocation && userLocation.latitude && userLocation.longitude) {
			goToMapLocation(mapRef, userLocation);
			setMainMapCenter(userLocation);
		}
	}, [userLocation, mapRef, setMainMapCenter]);

	/**
	 * When map center changes
	 *  Fetch tree groups for map center
	 */
	useEffect(() => {
		if (!mapCenter) {
			return;
		}

		const { latitude: mapCenterLat, longitude: mapCenterLng } = mapCenter;

		const mapCenterChanged = !prevMapCenter
			? true
			: prevMapCenter.latitude !== mapCenterLat || prevMapCenter.longitude !== mapCenterLng;

		if (mapCenterChanged) {
			fetchTreeGroups(mapCenter);
			showSnackbar('Fetching trees...', {
				action: { label: 'Dismiss', onPress: () => hideSnackbar() },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapCenter, fetchTreeGroups]);

	useEffect(() => {
		if (!searchQuery || searchQuery === '') {
			setIsSearchOpen(false);
		} else {
			setIsSearchOpen(true);
			fetchSearchedLocations(searchQuery);
		}
	}, [searchQuery, fetchSearchedLocations]);

	const handleOnRegionChange = (_region) => {
		setMainMapCenter(_region);
	};

	const handleSearchedResultPress = async (_result) => {
		const { placeId } = _result;
		try {
			const location = await getLocationForGooglePlaceId(placeId);
			if (location && location.latitude && location.longitude) {
				setIsSearchOpen(false);
				goToMapLocation(mapRef, location);
				setMainMapCenter(location);
			}
		} catch (error) {
			logger.logError(error, 'Error getting location for google place id.');
		}
	};

	const renderTrees = (_data) => {
		return treeGroups.map((_treeGroup) => {
			const { location, trees, _id } = _treeGroup;
			const markerCoords = {
				latitude: location.coordinates[1],
				longitude: location.coordinates[0],
			};

			if (trees.length === 1) {
				return <TreeMarker key={trees[0]._id} coordinate={markerCoords} />;
			}

			return <TreeClusterMarker key={_id} coordinate={markerCoords} treeCount={trees.length} />;
		});
	};

	const AddSheet = () => {
		return (
			<View style={styles.addSheetHandleContainer}>
				<View style={styles.addSheetHandle} />
				<AddPanel onTabClick={() => addSheetRef.current.snapTo(1)} />
			</View>
		);
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.topBarContainer}>
					<AutoCompleteSearch
						onResultPress={handleSearchedResultPress}
						placeholder="Search Location"
						onChangeText={(_query) => setSearchQuery(_query)}
						value={searchQuery}
						results={isSearchOpen ? searchedLocations : null}
						style={isSearchOpen ? styles.autoCompleteSearchFull : styles.autoCompleteSearch}
					/>
					{!isSearchOpen && (
						<View style={styles.topBarIconContainer}>
							<MaterialCommunityIcons name="tune" size={variables.font.xxl} />
						</View>
					)}
					{!isSearchOpen && (
						<View style={styles.topBarIconContainer}>
							<MaterialCommunityIcons name="bell-outline" size={variables.font.xxl} />
						</View>
					)}
				</View>
				<MapView
					initialRegion={{
						latitude: mapCenter.latitude,
						longitude: mapCenter.longitude,
						latitudeDelta: 0.011582007226706992,
						longitudeDelta: 0.010652057826519012,
					}}
					onMapLoad={(ref) => {
						setMapRef(ref);
					}}
					showsUserLocation
					showsCompass={false}
					showsMyLocationButton={false}
					onRegionChangeComplete={handleOnRegionChange}
				>
					{renderTrees()}
				</MapView>
			</View>
			{!isKeyboardOpen && (
				<BottomSheet
					ref={addSheetRef}
					snapPoints={[450, 300, 120, 80]}
					initialSnap={2}
					borderRadius={8}
					renderContent={AddSheet}
				/>
			)}
		</>
	);
};

export default AddScreen;
