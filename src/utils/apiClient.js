import axios from 'axios';
import commonConfig from '../config/common';

const axiosInstance = axios.create({
	baseURL: `${commonConfig.api.base}/${commonConfig.api.version}`,
});

export default axiosInstance;

const currentRequests = {};

export const initializeAxiosInterceptors = (accessToken, requestInterceptorCB, requestFinished) => {
	axiosInstance.interceptors.request.use(
		(config) => {
			const { headers, ...rest } = config;
			requestInterceptorCB(config);

			let cancelToken = null;
			if (rest.data && rest.data.cancelPrevious) {
				if (currentRequests[config.url]) {
					const source = currentRequests[config.url];
					delete currentRequests[config.url];
					source.cancel('New request found. Cancelling previous request for', config.url);
				}

				const source = axios.CancelToken.source();
				cancelToken = source.token;
				currentRequests[config.url] = source;
			}

			return {
				headers: {
					'x-id-token': accessToken,
					...headers,
				},
				cancelToken,
				...rest,
			};
		},
		(error) => {
			requestFinished(error);
			const { config } = error;

			if (axios.isCancel(error)) {
				return new Promise(() => {});
			}

			if (currentRequests[config.url]) {
				delete currentRequests[config.url];
			}

			return Promise.reject(error);
		}
	);
	axiosInstance.interceptors.response.use(
		(response) => {
			requestFinished(response);

			if (currentRequests[response.request.responseURL]) {
				delete currentRequests[response.request.responseURL];
			}

			return response;
		},
		(error) => {
			requestFinished(error);
			const { config } = error;
			if (axios.isCancel(error)) {
				return new Promise(() => {});
			}

			if (currentRequests[config.url]) {
				delete currentRequests[config.url];
			}

			return Promise.reject(error);
		}
	);
};

export const getUserActivity = (userId) => {
	return axiosInstance.get(`user/${userId}/activity`);
};

export const getTreeGroups = ({ lat, lng, radius, health }) => {
	return axiosInstance.get('tree_group', {
		params: {
			lat,
			lng,
			radius,
			health,
		},
		data: { noloading: true, cancelPrevious: true },
	});
};

export const updateWaterStatusForTreeGroups = (ids) => {
	console.log({ treeGroups: ids });
	return axiosInstance.patch('tree_group/water', { treeGroups: ids });
};

export const getTreeDetail = (treeId) => {
	return axiosInstance.get(`/tree/${treeId}`);
};

export const getTreeActivity = (treeId) => {
	return axiosInstance.get(`/tree/${treeId}/activity`);
};
