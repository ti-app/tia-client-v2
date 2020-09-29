import { RESULTS, PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { GOOGLE_PLACES_API_KEY, GOOGLE_GEOCODING_API_KEY } from '@env';
import Axios from 'axios';

import logger from '../../utils/logger';

export const FETCH_USER_LOCATION_SUCCESS = 'FETCH_USER_LOCATION_SUCCESS';
export const FETCH_SEARCHED_LOCATION_SUCCESS = 'FETCH_SEARCHED_LOCATION_SUCCESS';

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

export const callGoogleAutoComplete = (location, searchQuery) => {
	const placesApiKey = GOOGLE_PLACES_API_KEY;

	return Axios({
		url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?location=${location}&input=${searchQuery}&key=${placesApiKey}`,
		data: { noloading: true },
	});
};

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

export const callGooglePlacesApi = async (placeId) => {
	const geocodeApiKey = GOOGLE_GEOCODING_API_KEY;

	return Axios({
		url: `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${geocodeApiKey}`,
	});
};

export const callGoogleNearbyApi = async (location, radius = 100) => {
	const placesApiKey = GOOGLE_PLACES_API_KEY;
	const { latitude, longitude } = location;

	return Axios({
		url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&key=${placesApiKey}&radius=${radius}&rankby=prominence`,
	});
};

export const fetchSearchedLocationSuccess = (data) => ({
	type: FETCH_SEARCHED_LOCATION_SUCCESS,
	payload: data,
});
