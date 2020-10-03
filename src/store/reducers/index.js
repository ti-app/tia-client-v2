import { combineReducers } from 'redux';
import locationReducer from './location.reducer';
import treeReducer from './tree.reducer';
import uiInteractionsReducer from './ui-interactions.reducer';

// Root Reducer
const rootReducer = combineReducers({
	location: locationReducer,
	ui: uiInteractionsReducer,
	tree: treeReducer,
});

export default rootReducer;
