import { StyleSheet } from 'react-native';
import * as colors from '../../../theme/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		// marginHorizontal: 8,
		paddingHorizontal: 8,
	},
	infoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 16,
	},
	imageNameContainer: {
		flexDirection: 'row',
	},
});
