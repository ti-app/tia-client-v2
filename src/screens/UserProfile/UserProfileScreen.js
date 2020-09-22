import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Button, Avatar, Title, Subheading, IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import logger from '../../utils/logger';
import { BorderView } from '../../shared';
import styles from './UserProfileScreen.style';

const UserProfileScreen = () => {
	const onLogoutClick = async () => {
		try {
			await auth().signOut();
		} catch (error) {
			logger.logError(error, 'Error logging out');
		}
	};

	const currentUser = useMemo(() => {
		return auth().currentUser;
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<BorderView show={false} style={styles.profileInfoContainer}>
				<View style={{ flexDirection: 'row' }}>
					<Avatar.Image size={64} source={{ uri: currentUser.photoURL }} />
					<View style={styles.nameContainer}>
						<Title>{currentUser.displayName}</Title>
						<Subheading>{currentUser.email}</Subheading>
					</View>
				</View>
				<View>
					<IconButton icon="logout-variant" onPress={onLogoutClick} />
				</View>
			</BorderView>
		</View>
	);
};

export default UserProfileScreen;
