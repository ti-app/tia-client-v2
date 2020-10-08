import { StyleSheet } from 'react-native';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';

export default StyleSheet.create({
	nearbyTreesContainer: {
		flex: 1,
		paddingTop: variables.space.base,
	},
	treeCountTitle: {
		fontSize: variables.font.large,
		marginBottom: variables.space.base,
	},
	treeCountContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	treeCountItem: {
		borderWidth: 1,
		borderColor: colors.lightGray,
		borderRadius: 8,
		padding: variables.space.small,
	},
	treeCountText: {
		textAlign: 'center',
		fontSize: variables.font.xxl,
	},
	treeCountLabel: {
		textAlign: 'center',
	},
	healthy: {
		color: colors.success,
	},
	weak: {
		color: colors.warning,
	},
	almostDead: {
		color: colors.error,
	},
});
