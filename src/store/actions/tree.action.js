import {
	updateWaterStatusForTreeGroups,
	getTreeGroups,
	getTreeGroupClusters,
} from '../../utils/apiClient';
import logger from '../../utils/logger';
import { Dimensions } from 'react-native';

export const FETCH_TREE_GROUP_SUCCESS = 'FETCH_TREE_GROUP_SUCCESS';
export const FETCH_TREE_GROUP_CLUSTER_SUCCESS = 'FETCH_TREE_GROUP_CLUSTER_SUCCESS';

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
		const { latitude, longitude, latitudeDelta, longitudeDelta } = location;

		const minLng = longitude - longitudeDelta / 2;
		const maxLng = longitude + longitudeDelta / 2;
		const minLat = latitude - latitudeDelta / 2;
		const maxLat = latitude + latitudeDelta / 2;

		const screenWidth = Dimensions.get('window').width;

		const zoomLevel = Math.ceil(Math.log2(360 * (screenWidth / 256 / longitudeDelta)) + 1);

		const response = await getTreeGroupClusters({
			bbox: `${minLng},${minLat},${maxLng},${maxLat}`,
			zoom: zoomLevel,
		});

		dispatch(fetchTreeGroupsClustersSuccess(response.data));
	} catch (error) {
		logger.logError(error, 'Error fetching nearby trees');
	}
};

export const waterMultipleTreeGroups = (ids) => async (dispatch, getState) => {
	try {
		await updateWaterStatusForTreeGroups(ids);

		dispatchFetchTreeClusterAction(dispatch, getState);
	} catch (error) {
		logger.logError(error, 'Error fetching nearby trees');
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
