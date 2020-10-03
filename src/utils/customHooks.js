import { useRef, useEffect, useState, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import * as uiActions from '../store/actions/ui-interactions.action';

export const usePrevious = (value) => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};

export const useKeyboardHideHook = () => {
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

	const keyboardDidShow = () => {
		setIsKeyboardOpen(true);
	};

	const keyboardDidHide = () => {
		setIsKeyboardOpen(false);
	};

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	return [isKeyboardOpen, setIsKeyboardOpen];
};

export const useSnackbar = () => {
	const dispatch = useDispatch();

	const showSnackbar = useCallback((...params) => dispatch(uiActions.showSnackbar(...params)), [
		dispatch,
	]);
	const hideSnackbar = useCallback((message) => dispatch(uiActions.hideSnackbar(message)), [
		dispatch,
	]);

	return { showSnackbar, hideSnackbar };
};
