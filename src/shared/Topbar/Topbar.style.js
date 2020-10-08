import { StyleSheet } from 'react-native';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';

export default StyleSheet.create({
	topBarContainer: {
		marginHorizontal: variables.space.base,
		marginTop: variables.space.large,
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
	},
	topBarIconContainer: {
		marginLeft: variables.space.small,

		width: 38,
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.theme.background,
		borderRadius: 4,
		justifyContent: 'center',
		elevation: 4,
	},
	autoCompleteSearch: {
		flex: 4,
	},
	autoCompleteSearchFull: {},
});
