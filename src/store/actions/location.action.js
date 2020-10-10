import { RESULTS, PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import logger from '../../utils/logger';
import { callGoogleAutoComplete } from '../../utils/google-api';
import { fetchTreeGroups } from './tree.action';

export const FETCH_USER_LOCATION_SUCCESS = 'FETCH_USER_LOCATION_SUCCESS';
export const FETCH_SEARCHED_LOCATION_SUCCESS = 'FETCH_SEARCHED_LOCATION_SUCCESS';
export const SET_MAIN_MAP_CENTER = 'SET_MAIN_MAP_CENTER';
/**
 * Fetched user location and if mapRef is passed, moves map to userLocation
 * @param {Object} mapRef
 */
export const fetchUserLocation = () => {
	return async (dispatch) => {
		try {
			const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

			if (result !== RESULTS.GRANTED) {
				// TODO: think of something which can and should be done here.
			}

			// I don't really understand why we need to use setTimeout()
			// Help yourself with the link below. And do tell me if you understand why we need to use this.
			// https://github.com/expo/expo/issues/946#issuecomment-453181014
			setTimeout(() => {
				// TODO: Not sure if following works with async/await. Try and find a way, just for the heck of consistency.
				Geolocation.getCurrentPosition(
					(position) => {
						dispatch(fetchUserLocationSuccess(position));
					},
					(error) => {
						logger.logError(error, 'Error while getting current position');
					},
					{
						enableHighAccuracy: true,
						timeout: 15000,
						maximumAge: 10000,
					}
				);
			});
		} catch (error) {
			logger.logError(error, 'Error while asking for permisssion');
		}
	};
};

export const fetchUserLocationSuccess = (locationData) => ({
	type: FETCH_USER_LOCATION_SUCCESS,
	payload: locationData,
});

export const fetchSearchedLocation = (searchQuery) => async (dispatch, getState) => {
	const { userLocation } = getState().location;

	const { latitude, longitude } = userLocation || {};

	const location = `${latitude},${longitude}`;

	try {
		const response = await callGoogleAutoComplete(location, searchQuery);
		dispatch(fetchSearchedLocationSuccess(response.data));
	} catch (error) {
		logger.logError(error, 'Error searching');
	}
};

export const fetchSearchedLocationSuccess = (data) => ({
	type: FETCH_SEARCHED_LOCATION_SUCCESS,
	payload: data,
});

export const setMainMapCenter = (mapCenter, shouldFetchTreeGroups = true) => (
	dispatch,
	getState
) => {
	const state = getState();
	const { mainMapCenter: prevMainMapCenter } = state;

	const mapCenterChanged = !prevMainMapCenter
		? true
		: prevMainMapCenter.latitude !== mapCenter.latitude ||
		  prevMainMapCenter.longitude !== mapCenter.longitude;

	dispatch({
		type: SET_MAIN_MAP_CENTER,
		payload: mapCenter,
	});

	if (mapCenterChanged && shouldFetchTreeGroups) {
		dispatch(fetchTreeGroups(mapCenter));
	}
};
