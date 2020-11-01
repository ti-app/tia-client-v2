import { StyleSheet } from 'react-native';
import variables from '../../../theme/variables';
import * as colors from '../../../theme/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	addSheetHandle: {
		width: 24,
		height: 4,
		backgroundColor: colors.gray,
		borderRadius: 4,
		alignSelf: 'center',
	},
	addSheetHandleContainer: {
		padding: variables.space.base,
		backgroundColor: colors.theme.background,
		height: '100%',
	},
	myLocationButtonContainer: {
		display: 'flex',
		flexDirection: 'row-reverse',
		paddingLeft: variables.space.base,
		paddingBottom: variables.space.base,
	},
});
