import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './TreeCluster.style';
import * as colors from '../../../../theme/colors';
import variables from '../../../../theme/variables';

const TreeCluster = ({ coordinate, onPress, treeCount, selected }) => {
	return (
		<Marker tracksViewChanges={false} coordinate={coordinate} onPress={onPress}>
			<View style={styles.treeClusterMarkerContainer}>
				<View
					style={[styles.treeClusterMarkerCircle, selected ? styles.selectedMarkerCircle : null]}
				>
					{!selected && (
						<Text style={styles.treeClusterNumber}>{treeCount}</Text>
						// <Text style={styles.treeClusterNumber}>{treeCount > 9 ? '9+' : treeCount}</Text>
					)}
					{selected && (
						<MaterialCommunityIcons
							style={styles.selectedIcon}
							name="check"
							color={colors.white}
							size={variables.font.large}
						/>
					)}
				</View>
				<View
					style={[styles.treeClusterMarkerBottomPin, selected ? styles.selectedMarkerPin : null]}
				/>
			</View>
		</Marker>
	);
};

export default TreeCluster;
