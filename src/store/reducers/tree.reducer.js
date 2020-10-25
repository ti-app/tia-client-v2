import {
	FETCH_TREE_GROUP_AGGREGATED_DATA_SUCCESS,
	FETCH_TREE_GROUP_CLUSTER_SUCCESS,
	FETCH_TREE_GROUP_SUCCESS,
} from '../actions/tree.action';

const initialState = {
	treeGroups: [],
	nearbyTreesHealthStatus: { healthy: 0, weak: 0, almostDead: 0 },
	treeGroupsClusters: [],
};

const parseNearbyTreeHealth = (_data) => {
	const { healthy = 0, weak = 0, average = 0, almostDead = 0, adequate = 0 } = _data;
	return {
		healthy: healthy + adequate,
		weak: weak + average,
		almostDead,
	};
};

const treeReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TREE_GROUP_SUCCESS: {
			return { ...state, treeGroups: action.payload };
		}

		case FETCH_TREE_GROUP_CLUSTER_SUCCESS: {
			return { ...state, treeGroupsClusters: action.payload };
		}

		case FETCH_TREE_GROUP_AGGREGATED_DATA_SUCCESS: {
			const nearbyTreespHealth = parseNearbyTreeHealth(action.payload);
			return {
				...state,
				nearbyTreesHealthStatus: { ...state.nearbyTreesHealthStatus, ...nearbyTreespHealth },
			};
		}

		default: {
			return state;
		}
	}
};

export default treeReducer;

export const selectTreeGroups = (state) => state.tree.treeGroups;
export const selectTreeGroupsClusters = (state) => state.tree.treeGroupsClusters;
export const selectNearbyTreesHealthStatus = (state) => state.tree.nearbyTreesHealthStatus;
