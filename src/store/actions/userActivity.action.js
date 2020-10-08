import { getUserActivity } from '../../utils/apiClient';
import logger from '../../utils/logger';

export const FETCH_USER_ACTIVITY_SUCCESS = 'FETCH_USER_ACTIVITY_SUCCESS';

export const fetchUserActivity = (userId) => async (dispatch, getState) => {
	try {
		const response = await getUserActivity(userId);
		dispatch(fetchUserActivitySuccess(response.data));
	} catch (error) {
		logger.logError(error, 'Error fetching nearby trees');
	}
};

export const fetchUserActivitySuccess = (payload) => ({
	type: FETCH_USER_ACTIVITY_SUCCESS,
	payload,
});
