import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';

import styles from './LoginScreen.style';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';
import logger from '../../utils/logger';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onLoginClick = async () => {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(async (firebaseUser) => {
				try {
					analytics().logLogin({
						method: 'email',
					});
					navigation.navigate('Home');
					await AsyncStorage.setItem('USER', JSON.stringify(firebaseUser));
				} catch (error) {
					logger.logError(error, 'Error while saving user in async storage.');
				}
			})
			.catch((error) => {
				logger.logError(error, 'Error while login.');
			});
	};

	return (
		<View>
			<TextInput label="Email" value={email} onChangeText={(_email) => setEmail(_email)} />
			<TextInput
				label="Password"
				value={password}
				onChangeText={(_password) => setPassword(_password)}
			/>
			<Button mode="contained" onPress={onLoginClick}>
				Login
			</Button>
			<SocialLogin />
		</View>
	);
};

export default LoginScreen;
