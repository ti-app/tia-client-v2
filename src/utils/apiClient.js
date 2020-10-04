import axios from 'axios';
import commonConfig from '../config/common';

// const apiClient = (config) => axios({ baseURL: commonConfig.api.base, ...config });

const axiosInstance = axios.create({
	baseURL: commonConfig.api.base,
});

export default axiosInstance;
// export default apiClient;

export const initializeAxiosInterceptors = (
	accessToken,
	requestInterceptorCB,
	responseInterceptorCB
) => {
	axiosInstance.interceptors.request.use(
		(config) => {
			const { headers, ...rest } = config;
			requestInterceptorCB(config);

			return {
				headers: {
					'x-id-token': accessToken,
					...headers,
				},
				...rest,
			};
		},
		(error) => Promise.reject(error)
	);
	axiosInstance.interceptors.response.use(
		(response) => {
			responseInterceptorCB(response);
			return response;
		},
		(error) => Promise.reject(error)
	);
};

export const getUserActivity = (userId) => {
	return axiosInstance.get(`user/${userId}/activity`);
};
