import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import styles from './Tree.style';

const Tree = ({ coordinate, onPress }) => {
	return (
		<Marker tracksViewChanges={false} coordinate={coordinate} onPress={onPress}>
			<View style={styles.treeMarkerContainer}>
				<View style={styles.treeMarkerCircle} />
				<View style={styles.treeMarkerBottomPin} />
			</View>
		</Marker>
	);
};

export default Tree;
