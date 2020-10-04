import { StyleSheet } from 'react-native';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';

export default StyleSheet.create({
	materialTabBar: {
		flexDirection: 'row',
		// paddingTop: variables.space.base,
		// paddingBottom: variables.space.base,
		// borderColor: 'red',
		// borderWidth: 1,
		paddingHorizontal: variables.space.small,
		marginBottom: variables.space.small,
		// shadowColor: black,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 1,
		// },
		// shadowOpacity: 0.2,
		// shadowRadius: 1.41,
	},
	materialTab: { alignItems: 'center', paddingRight: variables.space.large },
	tabText: { fontSize: variables.font.base },
	tabHighlight: {
		width: '100%',
		height: 4,
		borderRadius: 4,
		backgroundColor: colors.theme.primary,
		marginTop: variables.space.xs,
	},
});
