import React from 'react';
import { Circle, Marker } from 'react-native-maps';
import { Text, TouchableRipple } from 'react-native-paper';
import * as colors from '../../../../theme/colors';
import Colors from 'color';
import styles from './TreeCluster.style';
import variables from '../../../../theme/variables';

// prefix: zoom
const ZOOM_PREFIX_MAP = {
	1: 4,
	2: 6,
	3: 8,
	4: 12,
	5: 14,
	6: 16,
	7: 17,
	8: 18,
	9: 22,
};

// zoom: radis_in_km
const CLUSTER_RADIUS_MAP = {
	4: 666.67,
	5: 533.33,
	6: 333.33,
	7: 133.33,
	8: 66.67,
	9: 33.33,
	10: 20.0,
	11: 10.0,
	12: 5.0,
	13: 2.0,
	14: 1.0,
	15: 0.42,
	16: 0.2,
	17: 0.05,
	18: 0.025,
	19: 0.018,
	20: 0.012,
	21: 0.007,
	22: 0.004,
};

const TreeCluster = ({ id, coordinate, treeCount, onPress }) => {
	const prefixLength = id.length;

	const zoom = ZOOM_PREFIX_MAP[prefixLength];
	const radius = CLUSTER_RADIUS_MAP[zoom];
	const treeCountFontSize = Math.max(variables.font.base, 3 * (23 - zoom));

	return (
		<>
			<Circle
				center={coordinate}
				radius={radius * 1000}
				strokeWidth={1}
				strokeColor={colors.green}
				fillColor={Colors(colors.green).alpha(0.5).toString()}
				onPress={() => {
					console.log('circle press');
				}}
			/>
			<Marker tracksViewChanges={false} anchor={{ x: 0.5, y: 0.5 }} coordinate={coordinate}>
				<TouchableRipple
					onPress={() => {
						console.log('text in circle press');
					}}
				>
					<Text
						style={[
							{
								fontSize: treeCountFontSize,
							},
							styles.treeClusterNumber,
						]}
					>
						{treeCount}
					</Text>
				</TouchableRipple>
			</Marker>
		</>
	);
};

export default TreeCluster;
