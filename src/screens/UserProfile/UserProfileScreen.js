import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Title, Subheading, IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import logger from '../../utils/logger';
import { BorderView, TabView } from '../../shared';
import MyActivities from './MyActivities/MyActivities';
import styles from './UserProfileScreen.style';

const SecondRoute = () => <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />;

const UserProfileScreen = () => {
	const userProfileTabConfig = [
		{ key: 'myActivities', title: 'My Activities', component: MyActivities },
		{ key: 'myStats', title: 'My Statistics', component: SecondRoute },
		{ key: 'myGroup', title: 'My Group', component: MyActivities },
	];

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
		<View style={styles.container}>
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
			<View style={{ flex: 1 }}>
				<TabView tabConfig={userProfileTabConfig} />
			</View>
		</View>
	);
};

export default UserProfileScreen;
