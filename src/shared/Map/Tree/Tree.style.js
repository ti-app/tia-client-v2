import { StyleSheet } from 'react-native';
import * as colors from '../../../../theme/colors';
import variables from '../../../../theme/variables';

const treeMarkerCircleRadius = variables.space.base + 4;

export default StyleSheet.create({
	treeMarkerContainer: {},
	treeMarkerCircle: {
		backgroundColor: colors.green,
		borderRadius: treeMarkerCircleRadius / 2,
		width: treeMarkerCircleRadius,
		height: treeMarkerCircleRadius,
	},
	treeMarkerBottomPin: {
		width: 0,
		height: 0,
		position: 'relative',
		left: treeMarkerCircleRadius / 2 - 5.5,
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
});
