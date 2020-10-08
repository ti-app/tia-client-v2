import axios from 'axios';
import commonConfig from '../config/common';

const axiosInstance = axios.create({
	baseURL: `${commonConfig.api.base}/${commonConfig.api.version}`,
});

export default axiosInstance;

const currentRequests = {};

export const initializeAxiosInterceptors = (accessToken, requestInterceptorCB, responseInterceptorCB) => {
	axiosInstance.interceptors.request.use(
		(config) => {
			const { headers, data, ...rest } = config;
			requestInterceptorCB(config);

			let cancelToken = null;
			if (data && data.cancelPrevious) {
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
			responseInterceptorCB(response);

			if (currentRequests[response.request.responseURL]) {
				delete currentRequests[response.request.responseURL];
			}

			return response;
		},
		(error) => {
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
