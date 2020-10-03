import Axios from 'axios';
import { GOOGLE_PLACES_API_KEY, GOOGLE_GEOCODING_API_KEY } from '@env';

export const callGoogleAutoComplete = (location, searchQuery) => {
	const placesApiKey = GOOGLE_PLACES_API_KEY;

	return Axios({
		url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?location=${location}&input=${searchQuery}&key=${placesApiKey}`,
		data: { noloading: true },
	});
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

export const getLocationForGooglePlaceId = async (placeId) => {
	try {
		const response = await callGooglePlacesApi(placeId);

		const { results } = response.data;

		if (results && results.length && results[0] && results[0].geometry) {
			const { lat: latitude, lng: longitude } = results[0].geometry.location;
			const location = { latitude, longitude };
			return location;
		}
	} catch (error) {
		logger.logError(error, 'Error calling google places api');
	}
};
