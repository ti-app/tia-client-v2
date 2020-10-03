import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Text } from 'react-native-paper';
import styles from './TreeCluster.style';

const TreeCluster = ({ coordinate, onPress, treeCount }) => {
	return (
		<Marker tracksViewChanges={false} coordinate={coordinate} onPress={onPress}>
			<View style={styles.treeClusterMarkerContainer}>
				<View style={styles.treeClusterMarkerCircle}>
					<Text style={styles.treeClusterNumber}>{treeCount > 9 ? '9+' : treeCount}</Text>
				</View>
				<View style={styles.treeClusterMarkerBottomPin} />
			</View>
		</Marker>
	);
};

export default TreeCluster;
