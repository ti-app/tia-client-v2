import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import { getFirebaseUser } from './utils/firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { API_BASE_URL } from '@env';
import InitialLoadingScreen from './screens/InitialLoading/InitialLoadingScreen';
import AppIntro from './screens/AppIntro/AppIntro';

const AppContent = () => {
	const [authStatus, setAuthStatus] = useState('checking'); // checking, authenticated, unauthenticated
	const [showAppIntro, setShowAppIntro] = useState(false);

	const onAuthStateChanged = async () => {
		const _user = getFirebaseUser();
		setAuthStatus(_user ? 'authenticated' : 'unauthenticated');
		await AsyncStorage.setItem('USER', JSON.stringify(_user));
		if (_user) {
			// const accessToken = await getFirebaseToken();
			// TODO: Include token in interceptor
		}
	};

	useEffect(() => {
		AsyncStorage.getItem('SHOW_APP_INTRO').then((val) => {
			if (val && val === 'false') {
				// User has seen app intro
				console.log(API_BASE_URL);
				const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
				return subscriber;
			} else {
				// show app intro
				setShowAppIntro(true);
				AsyncStorage.setItem('SHOW_APP_INTRO', JSON.stringify(false));
			}
		});
	}, []);

	if (showAppIntro) {
		return <AppIntro />;
	}

	if (authStatus === 'unauthenticated') {
		return <AuthNavigator />;
	}

	if (authStatus === 'authenticated') {
		return <MainNavigator />;
	}

	return <InitialLoadingScreen />;
};

export default AppContent;
