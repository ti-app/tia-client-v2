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
	selectedIcon: {
		alignSelf: 'center',
	},
	selectedMarkerCircle: { backgroundColor: colors.darkGreen },
	treeClusterNumber: {
		fontSize: variables.font.base,
		color: colors.white,
		alignSelf: 'center',
	},
	treeClusterMarkerBottomPin: {
		width: 0,
		height: 0,
		position: 'relative',
		left: treeClusterMarkerCircleRadius / 2 - 5.5,
		bottom: 2,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderTopWidth: 9,
		borderRightWidth: 5.5,
		borderBottomWidth: 0,
		borderLeftWidth: 5.5,
		borderTopColor: colors.green,
		borderRightColor: 'transparent',
		borderBottomColor: 'transparent',
		borderLeftColor: 'transparent',
	},
	selectedMarkerPin: { borderTopColor: colors.darkGreen },
});
