import React from 'react';
import { Button } from 'react-native-paper';
import { goToMapLocation } from '../../utils/geo';
import styles from './MyLocation.style';

const MyLocation = ({ location, mapRef, style }) => {
	return (
		<Button
			style={[style]}
			compact
			icon="crosshairs-gps"
			mode="contained"
			color={'white'}
			labelStyle={styles.myLocationLabel}
			onPress={() => goToMapLocation(mapRef, location, 1000)}
		/>
	);
};

export default MyLocation;
