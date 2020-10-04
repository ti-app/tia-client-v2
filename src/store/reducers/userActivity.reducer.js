import { FETCH_USER_ACTIVITY_SUCCESS } from '../actions/userActivity.action';

const initialState = {
	userActivity: [],
};

const userActivityReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_ACTIVITY_SUCCESS: {
			const activity = action.payload.activities.map((x) => ({
				...x.activity,
				treeId: x.treeId,
			}));
			return { ...state, userActivity: activity };
		}

		default: {
			return state;
		}
	}
};

export default userActivityReducer;

export const selectUserActivity = (state) => state.userActivity.userActivity;
