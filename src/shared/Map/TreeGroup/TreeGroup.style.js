import { StyleSheet } from 'react-native';
import * as colors from '../../../../theme/colors';
import variables from '../../../../theme/variables';

const treeGroupMarkerCircleRadius = variables.space.base + 4;

export default StyleSheet.create({
	treeGroupMarkerContainer: {
		display: 'flex',
		padding: 0.5,
	},
	treeGroupMarkerCircle: {
		backgroundColor: colors.green,
		borderRadius: treeGroupMarkerCircleRadius / 2,
		width: treeGroupMarkerCircleRadius,
		height: treeGroupMarkerCircleRadius,
	},
	selectedIcon: {
		alignSelf: 'center',
	},
	selectedMarkerCircle: { backgroundColor: colors.darkGreen },
	treeGroupNumber: {
		fontSize: variables.font.base,
		color: colors.white,
		alignSelf: 'center',
	},
	treeGroupMarkerBottomPin: {
		width: 0,
		height: 0,
		position: 'relative',
		left: treeGroupMarkerCircleRadius / 2 - 5.5,
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
