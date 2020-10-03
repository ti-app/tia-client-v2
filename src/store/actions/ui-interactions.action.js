export const SET_LOADING = 'SET_LOADING';
export const SET_SNACKBAR_VISIBILITY = 'SET_SNACKBAR_VISIBILITY';

export const setLoading = (flag) => ({
	type: SET_LOADING,
	flag,
});

export const showSnackbar = (message, extraOptions) => ({
	type: SET_SNACKBAR_VISIBILITY,
	data: { show: true, message, extraOptions: { duration: 2000, ...extraOptions } },
});

export const hideSnackbar = () => ({
	type: SET_SNACKBAR_VISIBILITY,
	data: { show: false },
});
