import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import { LoginManager, AccessToken as FBAccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';

import styles from './SocialLogin.style';
import logger from '../../utils/logger';

GoogleSignin.configure({
	webClientId: GOOGLE_WEB_CLIENT_ID,
});

const SocialLogin = ({ style }) => {
	const signInWithFB = async () => {
		const { isCancelled } = await LoginManager.logInWithPermissions(['public_profile']);

		if (!isCancelled) {
			const { accessToken } = await FBAccessToken.getCurrentAccessToken();

			const credential = auth.FacebookAuthProvider.credential(accessToken);

			await auth().signInWithCredential(credential);

			analytics().logLogin({
				method: 'facebook',
			});
		}
	};

	const signInWithGoogle = async () => {
		await GoogleSignin.hasPlayServices();
		const googleUser = await GoogleSignin.signIn();

		const credential = auth.GoogleAuthProvider.credential(
			googleUser.idToken,
			googleUser.accessToken
		);

		await auth().signInWithCredential(credential);
		analytics().logLogin({
			method: 'google',
		});
	};

	const handleFBSignIn = async () => {
		try {
			await signInWithFB();
		} catch (error) {
			logger.logError(error, 'Error login with facebook');
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			await signInWithGoogle();
		} catch (error) {
			logger.logError(error, 'Error login with google');
		}
	};

	return (
		<View>
			<Button style={styles.facebookButton} onPress={handleFBSignIn}>
				<Text>FACEBOOK</Text>
			</Button>
			<Button style={styles.googleButton} onPress={handleGoogleSignIn}>
				<Text>GOOGLE</Text>
			</Button>
		</View>
	);
};

export default SocialLogin;
