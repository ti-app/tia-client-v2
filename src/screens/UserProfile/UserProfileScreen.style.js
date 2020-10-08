import { StyleSheet } from 'react-native';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.theme.surface,
	},

	profileInfoContainer: {
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		marginBottom: variables.space.xl,
	},
	nameContainer: {
		marginHorizontal: 12,
	},
	scene: {
		flex: 1,
	},
});
