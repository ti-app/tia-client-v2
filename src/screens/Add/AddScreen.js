import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';

import MapView from '../../shared/Map/MapView/MapView';
import AddPanel from './AddPanel';

import styles from './AddScreen.style';
import variables from '../../../theme/variables';
import { goToMapLocation } from '../../utils/geo';

import * as locationActions from '../../store/actions/location.action';
import { selectUserLocation } from '../../store/reducers/location.reducer';
import { useDispatch, useSelector } from 'react-redux';

const AddScreen = () => {
	const [mapRef, setMapRef] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [mapRegion, setMapRegion] = useState(null);
	const [mapCenter, setMapCenter] = useState({
		latitude: 18.5740821,
		longitude: 73.7777393,
	});
	const userLocation = useSelector(selectUserLocation);

	const dispatch = useDispatch();
	const fetchUserLocation = useCallback(() => dispatch(locationActions.fetchUserLocation()), [
		dispatch,
	]);

	const addSheetRef = useCallback((_node) => {
		if (_node !== null) {
			addSheetRef.current = _node;

			const showInitialBottomSheetAnimation = () => {
				const animationDuration = 50;
				setTimeout(() => {
					addSheetRef.current.snapTo(1);
					setTimeout(() => {
						addSheetRef.current.snapTo(2);
					}, animationDuration);
				}, animationDuration);
			};

			showInitialBottomSheetAnimation();
		}
	}, []);

	useEffect(() => {
		fetchUserLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setMapCenter(userLocation);
		goToMapLocation(mapRef, userLocation);
	}, [userLocation, mapCenter, mapRef]);

	const AddSheet = () => {
		return (
			<View style={styles.addSheetHandleContainer}>
				<View style={styles.addSheetHandle} />
				<AddPanel onTabClick={() => addSheetRef.current.snapTo(1)} />
			</View>
		);
	};

	const onChangeSearch = (query) => setSearchQuery(query);

	const handleOnRegionChange = (_region) => {
		setMapRegion(_region);
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.topBarContainer}>
					<Searchbar
						placeholder="Search Location"
						onChangeText={onChangeSearch}
						value={searchQuery}
						style={styles.searchBar}
					/>
					<View style={styles.topBarIconContainer}>
						<MaterialCommunityIcons name="tune" size={variables.font.xxl} />
					</View>
					<View style={styles.topBarIconContainer}>
						<MaterialCommunityIcons name="bell-outline" size={variables.font.xxl} />
					</View>
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
				/>
			</View>
			<BottomSheet
				ref={addSheetRef}
				snapPoints={[450, 300, 80]}
				initialSnap={2}
				borderRadius={10}
				renderContent={AddSheet}
			/>
		</>
	);
};

export default AddScreen;
