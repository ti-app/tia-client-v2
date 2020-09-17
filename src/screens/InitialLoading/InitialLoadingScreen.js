import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import styles from './InitialLoadingScreen.style';

const InitialLoadingScreen = () => (
	<View style={styles.container}>
		<Text>Life without love is like a tree without blossoms or fruit.</Text>
		<ActivityIndicator />
	</View>
);

export default InitialLoadingScreen;
