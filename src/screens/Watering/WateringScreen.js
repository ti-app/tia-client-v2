import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text, TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from '../../shared/Map/MapView/MapView';

import styles from './WateringScreen.style';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';
import { goToMapLocation } from '../../utils/geo';
import { usePrevious, useKeyboardHideHook } from '../../utils/customHooks';

import * as locationActions from '../../store/actions/location.action';
import * as treeActions from '../../store/actions/tree.action';
import { selectMainMapCenter, selectUserLocation } from '../../store/reducers/location.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectTreeGroups } from '../../store/reducers/tree.reducer';
import Topbar from '../../shared/Topbar/Topbar';
import TreeMarkers from '../../shared/Map/TreeMarkers/TreeMarkers';
import NearbyTreesPanel from './NearbyTreesPanel';
import CustomBottomSheet from '../../shared/CustomBottomSheet/CustomBottomSheet';

const WateringScreen = () => {
	const [mapRef, setMapRef] = useState(null);
	const [selectedTreeGroups, setSelectedTreeGroups] = useState({});
	const [selectedTreesCount, setSelectedTreesCount] = useState(0);
	const mapCenter = useSelector(selectMainMapCenter);
	const userLocation = useSelector(selectUserLocation);
	const treeGroups = useSelector(selectTreeGroups);
	const [isKeyboardOpen] = useKeyboardHideHook();

	// const { showSnackbar, hideSnackbar } = useSnackbar();

	const dispatch = useDispatch();
	const fetchUserLocation = useCallback(() => dispatch(locationActions.fetchUserLocation()), [
		dispatch,
	]);
	const setMainMapCenter = useCallback(
		(...param) => dispatch(locationActions.setMainMapCenter(...param)),
		[dispatch]
	);
	const waterMultipleTreeGroups = useCallback(
		(...param) => dispatch(treeActions.waterMultipleTreeGroups(...param)),
		[dispatch]
	);

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

	const handleOnRegionChange = (_region) => {
		setMainMapCenter(_region);
	};

	const onResultPress = (location) => {
		goToMapLocation(mapRef, location);
		setMainMapCenter(location);
	};

	const handleTreeGroupsSelect = (groupId, treeCount) => {
		let modifiedState = selectedTreeGroups;
		let newTreeCount = selectedTreesCount;
		if (selectedTreeGroups[groupId]) {
			delete modifiedState[groupId];
			newTreeCount = newTreeCount - treeCount;
		} else {
			modifiedState = { ...selectedTreeGroups, [groupId]: treeCount };
			newTreeCount = newTreeCount + treeCount;
		}
		setSelectedTreeGroups({ ...modifiedState });
		setSelectedTreesCount(newTreeCount);
	};

	const handleMarkWatered = () => {
		const treeGroupsToWater = Object.keys(selectedTreeGroups).map((id) => ({ id }));
		waterMultipleTreeGroups(treeGroupsToWater);
		resetSelectedTreeGroups();
	};

	const handleSelectedTreesClose = () => resetSelectedTreeGroups();

	const resetSelectedTreeGroups = () => {
		setSelectedTreeGroups({});
		setSelectedTreesCount(0);
	};

	const getTreeCountByStatus = (status) => {
		return treeGroups.reduce((sum, group) => {
			const healthyTreesInGroup = group.trees.reduce((treeCount, tree) => {
				if (tree.health === status) {
					return treeCount + 1;
				} else {
					return treeCount;
				}
			}, 0);
			return sum + healthyTreesInGroup;
		}, 0);
	};

	return (
		<>
			<View style={styles.container}>
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
					moveOnMarkerPress={false}
					onRegionChangeComplete={handleOnRegionChange}
				>
					<TreeMarkers
						enableSelection
						treeGroupData={treeGroups}
						selectedTreeGroups={selectedTreeGroups}
						onTreeGroupsSelect={handleTreeGroupsSelect}
					/>
				</MapView>
				{selectedTreesCount > 0 ? (
					<View style={styles.selectedTreesTopbar}>
						<TouchableRipple onPress={handleSelectedTreesClose}>
							<MaterialCommunityIcons name="close" color={colors.tint} size={variables.font.xxl} />
						</TouchableRipple>
						<Text style={styles.selectedTreeTopbarLabel}>
							{selectedTreesCount} {selectedTreesCount === 1 ? 'Tree' : 'Trees'} selected
						</Text>
						<Button uppercase={false} mode="contained" onPress={handleMarkWatered}>
							Mark watered
						</Button>
					</View>
				) : (
					<Topbar onResultPress={onResultPress} />
				)}
			</View>
			{!isKeyboardOpen && (
				<CustomBottomSheet
					snapPoints={[150, 60]}
					initialSnap={0}
					borderRadius={8}
					renderContent={() => {
						return (
							<NearbyTreesPanel
								healthy={getTreeCountByStatus('healthy')}
								weak={getTreeCountByStatus('weak')}
								almostDead={getTreeCountByStatus('almostDead')}
							/>
						);
					}}
				/>
			)}
		</>
	);
};

export default WateringScreen;
