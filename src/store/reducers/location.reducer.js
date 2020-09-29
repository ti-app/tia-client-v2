import {
	FETCH_USER_LOCATION_SUCCESS,
	FETCH_SEARCHED_LOCATION_SUCCESS,
} from '../actions/location.action';

const initialState = {
	userLocation: {
		latitude: 18.5740821,
		longitude: 73.7777393,
	},
	searchedLocationList: [],
};

const locationReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_LOCATION_SUCCESS: {
			return { ...state, userLocation: action.payload.coords };
		}

		case FETCH_SEARCHED_LOCATION_SUCCESS: {
			const locationList = (action.payload ? action.payload.predictions : []).map((aPrediction) => {
				const { description, place_id } = aPrediction;
				return { description, placeId: place_id };
			});
			return { ...state, searchedLocationList: locationList };
		}

		default: {
			return state;
		}
	}
};

export default locationReducer;

export const selectUserLocation = (state) => state.location.userLocation;
export const selectSearchedLocations = (state) => state.location.searchedLocationList;
