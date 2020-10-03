import { StyleSheet } from 'react-native';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';

export default StyleSheet.create({
	selectMethodContainer: {
		flex: 1,
		paddingTop: variables.space.base,
	},
	selectMethodButtonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: variables.space.small,
		paddingLeft: variables.space.xs,
	},
	selectMethodText: { color: colors.secondaryText },
	selectMethodButton: {
		borderRadius: 2 * variables.space.base,
		paddingLeft: variables.space.base,
		paddingRight: variables.space.base,
		marginRight: variables.space.xs,
		marginBottom: variables.space.small,
		borderWidth: 0,
		backgroundColor: colors.white,
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	selectMethodButtonText: {
		fontSize: 12,
		color: colors.secondaryText,
	},
	addTabBar: {
		flexDirection: 'row',
		paddingTop: variables.space.base,
		paddingBottom: variables.space.base,
	},
	addTabContainer: { marginRight: variables.space.large },
	addTab: { alignItems: 'center' },
	addTabText: { fontSize: variables.font.base },
	addTabHighlight: {
		width: '100%',
		height: 4,
		borderRadius: 4,
		backgroundColor: colors.theme.primary,
		marginTop: variables.space.xs,
	},
});
