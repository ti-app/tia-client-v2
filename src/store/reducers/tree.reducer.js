import { FETCH_TREE_GROUP_SUCCESS } from '../actions/tree.action';

const initialState = {
	treeGroups: [],
};

const treeReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TREE_GROUP_SUCCESS: {
			return { ...state, treeGroups: action.payload };
		}

		default: {
			return state;
		}
	}
};

export default treeReducer;

export const selectTreeGroups = (state) => state.tree.treeGroups;
