import { act } from 'react-test-renderer';
import { SET_LOADING, SET_SNACKBAR_VISIBILITY } from '../actions/ui-interactions.action';

const initialState = {
	loading: false,
	snackbar: { show: false, message: '', extraOptions: {} },
};

const uiInteractionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING: {
			return {
				...state,
				loading: action.flag,
			};
		}

		case SET_SNACKBAR_VISIBILITY: {
			return {
				...state,
				snackbar: {
					...initialState.snackbar,
					...action.data,
					extraOptions: { ...initialState.snackbar.extraOptions, ...action.data.extraOptions },
				},
			};
		}

		default: {
			return state;
		}
	}
};

export default uiInteractionsReducer;

export const selectLoading = (state) => state.ui.loading;
export const selectSnackbar = (state) => state.ui.snackbar;
