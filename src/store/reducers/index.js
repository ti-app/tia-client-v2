import { combineReducers } from 'redux';
import locationReducer from './location.reducer';

// Root Reducer
const rootReducer = combineReducers({
	location: locationReducer,
});

export default rootReducer;
