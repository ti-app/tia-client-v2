import apiClient from '../../utils/apiClient';
import logger from '../../utils/logger';

export const FETCH_TREE_GROUP_SUCCESS = 'FETCH_TREE_GROUP_SUCCESS';

export const dispatchFetchTreeGroupsAction = (dispatch, getState) => {
	const state = getState();
	const {
		location: { mainMapCenter },
		ui: { currentStatusList, currentRangeFilter },
	} = state;

	dispatch(
		fetchTreeGroups(
			{
				...mainMapCenter,
			},
			currentRangeFilter * 1000,
			currentStatusList.join(',')
		)
	);
};

export const fetchTreeGroups = (
	location,
	radius = 500,
	health = 'healthy,adequate,average,weak,almostDead'
) => async (dispatch, getState) => {
	try {
		const { latitude: lat, longitude: lng } = location;

		const response = await apiClient({
			url: '/tree_group',
			params: {
				lat,
				lng,
				radius,
				health,
			},
			headers: {
				'content-type': 'application/json',
			},
			data: { noloading: true, cancelPrevious: true },
		});

		dispatch(fetchTreeGroupsSuccess(response.data));
	} catch (error) {
		logger.logError(error, 'Error fetching nearby trees');
	}
};

export const fetchTreeGroupsSuccess = (payload) => ({
	type: FETCH_TREE_GROUP_SUCCESS,
	payload,
});
