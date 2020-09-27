import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	topBarContainer: {
		marginHorizontal: 16,
		marginTop: 26,
		flexDirection: 'row',
		alignItems: 'center',
	},
	topBarIconContainer: {
		marginLeft: 8,

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
		padding: 16,
		backgroundColor: '#fff',
		height: '100%',
	},
});
