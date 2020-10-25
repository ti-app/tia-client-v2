import { StyleSheet } from 'react-native';
import * as colors from '../../../../theme/colors';
import variables from '../../../../theme/variables';

const treeClusterMarkerCircleRadius = variables.space.base + 4;

export default StyleSheet.create({
	treeClusterMarkerContainer: {
		display: 'flex',
	},
	treeClusterMarkerCircle: {
		backgroundColor: colors.green,
		borderRadius: treeClusterMarkerCircleRadius / 2,
		width: treeClusterMarkerCircleRadius,
		height: treeClusterMarkerCircleRadius,
	},
	treeClusterNumber: {
		color: colors.white,
		alignSelf: 'center',
	},
});
