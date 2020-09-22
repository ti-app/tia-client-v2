import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken as FBAccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';

import logger from '../../utils/logger';
import styles from './LoginScreen.style';

GoogleSignin.configure({
	webClientId: GOOGLE_WEB_CLIENT_ID,
});

const LoginScreen = () => {
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
		<View style={styles.loginScreen}>
			<Text style={styles.loginLabel}>Log in with</Text>
			<View>
				<Button
					mode="contained"
					style={[styles.socialLoginButton, styles.facebookButton]}
					onPress={handleFBSignIn}
				>
					<Text style={styles.socialLoginButtonText}>FACEBOOK</Text>
				</Button>
				<Button
					mode="contained"
					style={[styles.socialLoginButton, styles.googleButton]}
					onPress={handleGoogleSignIn}
				>
					<Text style={styles.socialLoginButtonText}>GOOGLE</Text>
				</Button>
			</View>
		</View>
	);
};

export default LoginScreen;
