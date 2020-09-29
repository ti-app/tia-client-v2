import { StyleSheet } from 'react-native';
import variables from '../../../theme/variables';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	topBarContainer: {
		marginHorizontal: variables.space.base,
		marginTop: variables.space.large,
		flexDirection: 'row',
		alignItems: 'center',
	},
	topBarIconContainer: {
		marginLeft: variables.space.small,

		width: 38,
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 4,
		justifyContent: 'center',
		elevation: 4,
	},
	searchBar: {
		flex: 4,
	},
	addSheetHandle: {
		width: 24,
		height: 4,
		backgroundColor: '#C6C6C67E',
		borderRadius: 4,
		alignSelf: 'center',
	},
	addSheetHandleContainer: {
		padding: variables.space.base,
		backgroundColor: '#fff',
		height: '100%',
	},
});
