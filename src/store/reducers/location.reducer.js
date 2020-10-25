import {
	FETCH_USER_LOCATION_SUCCESS,
	SET_MAIN_MAP_CENTER,
	FETCH_SEARCHED_LOCATION_SUCCESS,
} from '../actions/location.action';

const initialCoords = {
	latitude: 18.5740821,
	longitude: 73.7777393,
};

const initialState = {
	userLocation: initialCoords,
	mainMapCenter: initialCoords,
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

		case SET_MAIN_MAP_CENTER: {
			return {
				...state,
				mainMapCenter: { ...state.mainMapCenter, ...(action.payload || initialCoords) },
			};
		}
		default: {
			return state;
		}
	}
};

export default locationReducer;

export const selectUserLocation = (state) => state.location.userLocation;
export const selectMainMapCenter = (state) => state.location.mainMapCenter;
export const selectSearchedLocations = (state) => state.location.searchedLocationList;
