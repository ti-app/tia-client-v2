import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, TouchableRipple } from 'react-native-paper';
import Color from 'color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from '../../shared/Map/MapView/MapView';

import styles from './WateringScreen.style';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';
import {
	goToMapLocation,
	getDistanceFromLatLon,
	getLatLngDeltaForDistance,
	isDistanceLessThan,
} from '../../utils/geo';
import { useKeyboardHideHook, useSnackbar } from '../../utils/customHooks';

import * as locationActions from '../../store/actions/location.action';
import * as treeActions from '../../store/actions/tree.action';
import { selectMainMapCenter, selectUserLocation } from '../../store/reducers/location.reducer';
import {
	selectNearbyTreesHealthStatus,
	selectTreeGroupsClusters,
} from '../../store/reducers/tree.reducer';
import Topbar from '../../shared/Topbar/Topbar';
import TreeMarkers from '../../shared/Map/TreeMarkers/TreeMarkers';
import NearbyTreesPanel from './NearbyTreesPanel';
import CustomBottomSheet from '../../shared/CustomBottomSheet/CustomBottomSheet';
import config from '../../config/common';
import { Circle } from 'react-native-maps';
import MyLocation from '../../shared/MyLocation/MyLocation';

const allowedMaxMapDistance = config.maxProximityDistance * 3;

const WateringScreen = () => {
	const [mapRef, setMapRef] = useState(null);
	const [selectedTreeGroups, setSelectedTreeGroups] = useState({});
	const [selectedTreesCount, setSelectedTreesCount] = useState(0);
	const [showRangeCircle, setShowRangeCircle] = useState(false);
	const mapCenter = useSelector(selectMainMapCenter);
	const userLocation = useSelector(selectUserLocation);
	const treeGroupClusters = useSelector(selectTreeGroupsClusters);
	const nearbyTreesHealthStatus = useSelector(selectNearbyTreesHealthStatus);
	const [isKeyboardOpen] = useKeyboardHideHook();

	const { showSnackbar } = useSnackbar();

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
			goToUserLocation();
			setMainMapCenter(
				{
					latitudeDelta: 0.011582007226706992,
					longitudeDelta: 0.010652057826519012,
					...userLocation,
				},
				{ shouldFetchTreeClusters: true, shouldFetchAggregatedTreeGroupData: true }
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userLocation, mapRef, setMainMapCenter]);

	const handleOnRegionChange = (region) => {
		setMainMapCenter(region, {
			shouldFetchTreeClusters: true,
			shouldFetchAggregatedTreeGroupData: true,
		});
		const {
			latitude: currentCenterLat,
			longitude: currentCenterLng,
			latitudeDelta: currentCenterLatDelta,
			longitudeDelta: currentCenterLngDelta,
		} = region;

		const topRightLat = currentCenterLat + currentCenterLatDelta;
		const topRightLng = currentCenterLng + currentCenterLngDelta;
		const bottomLeftLat = currentCenterLat - currentCenterLatDelta;
		const bottomLeftLng = currentCenterLng - currentCenterLngDelta;

		const distanceToTopRight = getDistanceFromLatLon([
			userLocation,
			{ latitude: topRightLat, longitude: topRightLng },
		]);
		const distanceToBottomLeft = getDistanceFromLatLon([
			userLocation,
			{ latitude: bottomLeftLat, longitude: bottomLeftLng },
		]);
		const distanceToCurrentCenter = getDistanceFromLatLon([
			userLocation,
			{ latitude: currentCenterLat, longitude: currentCenterLng },
		]);

		if (
			distanceToCurrentCenter > allowedMaxMapDistance ||
			distanceToTopRight > allowedMaxMapDistance ||
			distanceToBottomLeft > allowedMaxMapDistance
		) {
			goToUserLocation();
		}
	};

	const goToUserLocation = () => {
		goToMapLocation(mapRef, getUserRestrictedLocation(), 1000);
	};

	const getUserRestrictedLocation = () => {
		const { latitudeDelta: maxLatDelta, longitudeDelta: maxLngDelta } = getLatLngDeltaForDistance(
			userLocation,
			config.maxProximityDistance
		);

		return {
			latitude: userLocation.latitude,
			longitude: userLocation.longitude,
			latitudeDelta: Math.abs(maxLatDelta),
			longitudeDelta: Math.abs(maxLngDelta),
		};
	};

	const onResultPress = (location) => {
		goToMapLocation(mapRef, location);
		setMainMapCenter(location);
	};

	const handleTreeGroupsSelect = (groupId, treeCount, treeGroupLocation) => {
		if (!isDistanceLessThan(userLocation, treeGroupLocation)) {
			showSnackbar('You are more than 50 meters away from the tree.', { duration: 2000 });
			setShowRangeCircle(true);
			setTimeout(() => {
				setShowRangeCircle(false);
			}, 2000);
			return;
		}

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
					{showRangeCircle && (
						<Circle
							center={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
							radius={config.maxProximityDistance}
							strokeWidth={0.5}
							strokeColor={colors.blue}
							fillColor={Color(colors.blue).alpha(0.1).toString()}
						/>
					)}
					<TreeMarkers
						enableSelection
						selectedTreeGroups={selectedTreeGroups}
						onTreeGroupsSelect={handleTreeGroupsSelect}
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
					snapPoints={[200, 110]}
					initialSnap={0}
					borderRadius={8}
					renderContent={() => {
						return (
							<NearbyTreesPanel
								healthy={nearbyTreesHealthStatus.healthy}
								weak={nearbyTreesHealthStatus.weak}
								almostDead={nearbyTreesHealthStatus.almostDead}
							/>
						);
					}}
					renderHeader={() => {
						return (
							<View style={styles.myLocationButtonContainer}>
								<MyLocation location={getUserRestrictedLocation()} mapRef={mapRef} />
							</View>
						);
					}}
				/>
			)}
		</>
	);
};

export default WateringScreen;
