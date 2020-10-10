import { FETCH_TREE_GROUP_CLUSTER_SUCCESS, FETCH_TREE_GROUP_SUCCESS } from '../actions/tree.action';

const initialState = {
	treeGroups: [],
	treeGroupsClusters: [],
};

const treeReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TREE_GROUP_SUCCESS: {
			return { ...state, treeGroups: action.payload };
		}

		case FETCH_TREE_GROUP_CLUSTER_SUCCESS: {
			return { ...state, treeGroupsClusters: action.payload };
		}

		default: {
			return state;
		}
	}
};

export default treeReducer;

export const selectTreeGroups = (state) => state.tree.treeGroups;
export const selectTreeGroupsClusters = (state) => state.tree.treeGroupsClusters;
