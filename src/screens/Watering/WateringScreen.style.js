import { StyleSheet } from 'react-native';
import variables from '../../../theme/variables';
import * as colors from '../../../theme/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	selectedTreesTopbar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		padding: variables.space.base,
		width: '100%',
		backgroundColor: colors.theme.background,
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8,
	},
	selectedTreeTopbarLabel: {
		fontSize: variables.font.xl,
		fontWeight: 'bold',
	},
});
