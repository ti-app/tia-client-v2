import React from 'react';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import logger from '../../utils/logger';

const UserProfileScreen = () => {
	const onLogoutClick = async () => {
		try {
			await auth().signOut();
		} catch (error) {
			logger.logError(error, 'Error logging out');
		}
	};

	return (
		<Button mode="contained" onPress={onLogoutClick}>
			Logout
		</Button>
	);
};

export default UserProfileScreen;
