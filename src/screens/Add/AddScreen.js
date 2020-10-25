import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';

import MapView from '../../shared/Map/MapView/MapView';
import AddPanel from './AddPanel';

import styles from './AddScreen.style';
import { goToMapLocation } from '../../utils/geo';
import { useKeyboardHideHook } from '../../utils/customHooks';

import * as locationActions from '../../store/actions/location.action';
import { selectMainMapCenter, selectUserLocation } from '../../store/reducers/location.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectTreeGroupsClusters } from '../../store/reducers/tree.reducer';
import Topbar from '../../shared/Topbar/Topbar';
import TreeMarkers from '../../shared/Map/TreeMarkers/TreeMarkers';
import CustomBottomSheet from '../../shared/CustomBottomSheet/CustomBottomSheet';

const AddScreen = () => {
	const [mapRef, setMapRef] = useState(null);
	const mapCenter = useSelector(selectMainMapCenter);
	const userLocation = useSelector(selectUserLocation);
	const treeGroupClusters = useSelector(selectTreeGroupsClusters);
	const [isKeyboardOpen] = useKeyboardHideHook();

	const dispatch = useDispatch();
	const fetchUserLocation = useCallback(() => dispatch(locationActions.fetchUserLocation()), [
		dispatch,
	]);
	const setMainMapCenter = useCallback(
		(...param) => dispatch(locationActions.setMainMapCenter(...param)),
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
			setMainMapCenter({
				latitudeDelta: 0.011582007226706992,
				longitudeDelta: 0.010652057826519012,
				...userLocation,
			});
		}
	}, [userLocation, mapRef, setMainMapCenter]);

	const handleOnRegionChange = (_region) => {
		setMainMapCenter(_region);
	};

	const onResultPress = (location) => {
		goToMapLocation(mapRef, location);
		setMainMapCenter(location);
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
					showsMyLocationButton={true}
					onRegionChangeComplete={handleOnRegionChange}
				>
					<TreeMarkers
						treeGroupClusterData={treeGroupClusters}
						onTreePress={(treeId) => {
							console.log('AddScreen -> treeId', treeId);
						}}
						onTreeGroupPress={(treeGroupId) => {
							console.log('AddScreen -> treeGroupId', treeGroupId);
						}}
						onClusterPress={(_treeCluster) => {
							const { lat, lng } = _treeCluster;

							const location = {
								latitude: lat,
								longitude: lng,
							};

							goToMapLocation(mapRef, location);
							setMainMapCenter(location);
						}}
					/>
				</MapView>
				<Topbar onResultPress={onResultPress} />
			</View>
			{!isKeyboardOpen && (
				<CustomBottomSheet
					borderRadius={8}
					renderContent={(sheetRef) => {
						return <AddPanel onTabClick={() => sheetRef.current.snapTo(1)} />;
					}}
				/>
			)}
		</>
	);
};

export default AddScreen;
