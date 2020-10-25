import destination from '@turf/destination';
import { Dimensions } from 'react-native';

import config from '../config/common';
import logger from './logger';

export const checkIfOutOfRange = (getState) => {
	const state = getState();
	const {
		location: { userLocation, homeMapCenter },
	} = state;
	if (isDistanceLessThan(userLocation, homeMapCenter)) {
		return false;
	} else {
		logger.logError(
			`Action can only be performed within ${config.maxProximityDistance} meters of your location.`
		);
		return true;
	}
};

export const goToMapLocation = (mapRef, location, interval = 2000) => {
	if (mapRef) {
		const mapLocation = {
			latitudeDelta: 0.011582007226706992,
			longitudeDelta: 0.010652057826519012,
			...location,
		};

		mapRef.animateToRegion(mapLocation, interval);
	}
};

export const isDistanceLessThan = (
	firstLocation,
	secondLocation,
	threshold = config.maxProximityDistance
) => {
	const distance = getDistanceFromLatLon([firstLocation, secondLocation]);
	return distance < threshold;
};

/**
 * Returns a distance in meters
 * @param {Array.<{latitude: Number, longitude: Number}>} endpoints
 */
export const getDistanceFromLatLon = (endpoints) => {
	const { latitude: lat1, longitude: lon1 } = endpoints[0];
	const { latitude: lat2, longitude: lon2 } = endpoints[1];
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1); // deg2rad below
	const dLon = deg2rad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d * 1000; // Distance in meters
};

/**
 * Returns a LatLngDelta to the top and right of the location
 * @param {{latitude: Number, longitude: Number}} location
 * @param {Number} distance in meters
 */
export const getLatLngDeltaForDistance = (location, distance) => {
	const { latitude, longitude } = location;
	const point = [longitude, latitude];
	const bearing = 90;
	const options = { units: 'kilometers' };

	const secondPoint = destination(point, (distance * 2) / 1000, bearing, options);

	const [secondLongitude, secondLatitude] = secondPoint.geometry.coordinates;

	return { latitudeDelta: secondLatitude - latitude, longitudeDelta: secondLongitude - longitude };
};

/**
 * Converts degrees to radian
 * @param Number deg
 */
const deg2rad = (deg) => {
	return deg * (Math.PI / 180);
};

const getTreeCoordsByNumberOfTrees = (endpoints, numberOfPlants) => {
	const start = endpoints[0];
	const end = endpoints[1];
	const modifiedCoordinates = [];

	const latDiff = Math.abs(start.latitude - end.latitude);
	const lngDiff = Math.abs(start.longitude - end.longitude);

	const chunks = numberOfPlants - 1;

	const latStep = latDiff / chunks;
	const lngStep = lngDiff / chunks;

	let newLat = start.latitude;
	let newLng = start.longitude;

	for (let i = 1; i < chunks; i += 1) {
		if (start.latitude < end.latitude) {
			newLat += latStep;
		} else {
			newLat -= latStep;
		}
		if (start.longitude < end.longitude) {
			newLng += lngStep;
		} else {
			newLng -= lngStep;
		}
		modifiedCoordinates.push({ latitude: newLat, longitude: newLng });
	}

	return modifiedCoordinates;
};

// spacing is in meters
const getTreeCoordsBySpacing = (endpoints, spacing) => {
	const start = endpoints[0];
	const end = endpoints[1];
	const modifiedCoordinates = [];

	const latDiff = Math.abs(start.latitude - end.latitude);
	const lngDiff = Math.abs(start.longitude - end.longitude);

	const distance = getDistanceFromLatLon(endpoints);

	const chunks = distance / spacing;

	const latStep = latDiff / chunks;
	const lngStep = lngDiff / chunks;

	let newLat = start.latitude;
	let newLng = start.longitude;

	for (let i = 1; i < chunks; i += 1) {
		if (start.latitude < end.latitude) {
			newLat += latStep;
		} else {
			newLat -= latStep;
		}
		if (start.longitude < end.longitude) {
			newLng += lngStep;
		} else {
			newLng -= lngStep;
		}
		modifiedCoordinates.push({ latitude: newLat, longitude: newLng });
	}

	return modifiedCoordinates;
};

export const calculateTreeCoordinates = ({ spacing, type, numberOfPlants, endpoints }) => {
	if (endpoints.length === 2) {
		let modifiedTrees = [];

		if (type === 'spacing') {
			if (spacing > 0) {
				modifiedTrees = getTreeCoordsBySpacing(endpoints, spacing);
			}
		} else {
			modifiedTrees = getTreeCoordsByNumberOfTrees(endpoints, numberOfPlants);
		}

		return [endpoints[0], ...modifiedTrees, endpoints[1]];
	}
};

export const getBboxFromLocation = (_location) => {
	const { latitude, longitude, latitudeDelta, longitudeDelta } = _location;

	const minLng = longitude - longitudeDelta / 2;
	const maxLng = longitude + longitudeDelta / 2;
	const minLat = latitude - latitudeDelta / 2;
	const maxLat = latitude + latitudeDelta / 2;

	return `${minLng},${minLat},${maxLng},${maxLat}`;
};

export const getZoomLevelFromLocation = (_location) => {
	const { longitudeDelta } = _location;

	const screenWidth = Dimensions.get('window').width;

	const zoomLevel = Math.ceil(Math.log2(360 * (screenWidth / 256 / longitudeDelta)) + 1);

	return zoomLevel;
};
