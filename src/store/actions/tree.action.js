import {
	updateWaterStatusForTreeGroups,
	getTreeGroups,
	getTreeGroupClusters,
	getAggregatedTreeGroupData,
} from '../../utils/apiClient';
import logger from '../../utils/logger';
import { Dimensions } from 'react-native';
import { getBboxFromLocation, getZoomLevelFromLocation } from '../../utils/geo';

export const FETCH_TREE_GROUP_SUCCESS = 'FETCH_TREE_GROUP_SUCCESS';
export const FETCH_TREE_GROUP_CLUSTER_SUCCESS = 'FETCH_TREE_GROUP_CLUSTER_SUCCESS';
export const FETCH_TREE_GROUP_AGGREGATED_DATA_SUCCESS = 'FETCH_TREE_GROUP_AGGREGATED_DATA_SUCCESS';

export const dispatchFetchTreeGroupsAction = (dispatch, getState) => {
	const state = getState();
	const {
		location: { mainMapCenter },
	} = state;

	dispatch(fetchTreeGroups(mainMapCenter));
};

export const dispatchFetchTreeClusterAction = (dispatch, getState) => {
	const state = getState();
	const {
		location: { mainMapCenter },
	} = state;

	dispatch(fetchTreeGroupsClusters(mainMapCenter));
};

export const fetchTreeGroups = (
	location,
	radius = 500,
	health = 'healthy,adequate,average,weak,almostDead'
) => async (dispatch) => {
	try {
		const { latitude: lat, longitude: lng } = location;

		const response = await getTreeGroups({
			lat,
			lng,
			radius,
			health,
		});

		dispatch(fetchTreeGroupsSuccess(response.data));
	} catch (error) {
		logger.logError(error, 'Error fetching nearby trees');
	}
};

export const fetchTreeGroupsClusters = (
	location,
	radius = 500,
	health = 'healthy,adequate,average,weak,almostDead'
) => async (dispatch) => {
	try {
		const response = await getTreeGroupClusters({
			bbox: getBboxFromLocation(location),
			zoom: getZoomLevelFromLocation(location),
		});

		dispatch(fetchTreeGroupsClustersSuccess(response.data));
	} catch (error) {
		logger.logError(error, 'Error fetching nearby trees');
	}
};

export const fetchTreeGroupAggregatedData = (
	location,
	radius = 500,
	health = 'healthy,adequate,average,weak,almostDead'
) => async (dispatch) => {
	try {
		const response = await getAggregatedTreeGroupData({
			bbox: getBboxFromLocation(location),
			zoom: getZoomLevelFromLocation(location),
		});

		dispatch(fetchTreeGroupAggregatedDataSuccess(response.data));
	} catch (error) {
		logger.logError(error, 'Error fetching aggregated tree group data');
	}
};

export const waterMultipleTreeGroups = (ids) => async (dispatch, getState) => {
	try {
		await updateWaterStatusForTreeGroups(ids);

		dispatchFetchTreeClusterAction(dispatch, getState);
	} catch (error) {
		logger.logError(error, 'Error watering multiple tree groups');
	}
};

export const fetchTreeGroupsSuccess = (payload) => ({
	type: FETCH_TREE_GROUP_SUCCESS,
	payload,
});

export const fetchTreeGroupsClustersSuccess = (payload) => ({
	type: FETCH_TREE_GROUP_CLUSTER_SUCCESS,
	payload,
});

export const fetchTreeGroupAggregatedDataSuccess = (payload) => ({
	type: FETCH_TREE_GROUP_AGGREGATED_DATA_SUCCESS,
	payload,
});
