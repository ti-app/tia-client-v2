import React, { useState, useEffect, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import { getFirebaseToken, getFirebaseUser } from './utils/firebase';
import InitialLoadingScreen from './screens/InitialLoading/InitialLoadingScreen';
import AppIntro from './screens/AppIntro/AppIntro';
import { initializeAxiosInterceptors } from './utils/apiClient';
import * as uiActions from './store/actions/ui-interactions.action';
import { selectLoading, selectSnackbar } from './store/reducers/ui-interactions.reducer';
import * as colors from '../theme/colors';

const AppContent = () => {
	const [authStatus, setAuthStatus] = useState('checking'); // checking, authenticated, unauthenticated
	const [showAppIntro, setShowAppIntro] = useState(false);
	const loading = useSelector(selectLoading);
	const snackbar = useSelector(selectSnackbar);

	const dispatch = useDispatch();
	const setLoading = useCallback((flag) => dispatch(uiActions.setLoading(flag)), [dispatch]);
	const hideSnackbar = useCallback(() => dispatch(uiActions.hideSnackbar()), [dispatch]);

	const onAuthStateChanged = async () => {
		const _user = getFirebaseUser();
		setAuthStatus(_user ? 'authenticated' : 'unauthenticated');
		await AsyncStorage.setItem('USER', JSON.stringify(_user));
		if (_user) {
			const accessToken = await getFirebaseToken();
			initializeInterceptors(accessToken);
		}
	};

	const initializeInterceptors = useCallback(
		(accessToken) => {
			const requestInterceptor = ({ data }) => {
				if (data) {
					const { noloading } = data;
					if (!noloading) {
						setLoading(true);
					}
				}
			};
			const responseInterceptor = () => setLoading(false);
			initializeAxiosInterceptors(accessToken, requestInterceptor, responseInterceptor);
		},
		[setLoading]
	);

	useEffect(() => {
		AsyncStorage.getItem('SHOW_APP_INTRO').then((val) => {
			if (val && val === 'false') {
				// User has seen app intro
				const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
				return subscriber;
			} else {
				// show app intro
				setShowAppIntro(true);
				AsyncStorage.setItem('SHOW_APP_INTRO', JSON.stringify(false));
			}
		});
	}, []);

	const getNavigator = () => {
		if (showAppIntro) {
			return <AppIntro onDone={() => setShowAppIntro(false)} />;
		}

		switch (authStatus) {
			case 'unauthenticated':
				return <AuthNavigator />;
			case 'authenticated':
				return <MainNavigator />;
			default:
				return <InitialLoadingScreen />;
		}
	};

	return (
		<View style={[styles.container]}>
			{loading && (
				<View style={styles.loadingContainer}>
					<View style={styles.loadingOverlay} />
					<ActivityIndicator color={colors.blue} style={styles.loadingIndicator} />
				</View>
			)}
			{getNavigator()}
			<Snackbar
				visible={snackbar.show}
				{...snackbar.extraOptions}
				onDismiss={() => hideSnackbar(false)}
			>
				{snackbar.message}
			</Snackbar>
		</View>
	);
};

export default AppContent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loadingContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		zIndex: 99,
		justifyContent: 'center',
	},
	loadingOverlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.5,
		backgroundColor: 'black',
		zIndex: 99,
		justifyContent: 'center',
	},
});
