import { StyleSheet } from 'react-native';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';

export default StyleSheet.create({
	sheetHandle: {
		width: 24,
		height: 4,
		backgroundColor: colors.gray,
		borderRadius: 4,
		alignSelf: 'center',
	},
	sheetHandleContainer: {
		padding: variables.space.base,
		backgroundColor: colors.theme.background,
		height: '100%',
	},
});
