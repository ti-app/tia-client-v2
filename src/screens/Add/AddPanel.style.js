import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	selectMethodContainer: {
		flex: 1,
		paddingTop: 16,
	},
	selectMethodButtonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: 12,
		paddingLeft: 4,
	},
	selectMethodButton: {
		borderRadius: 32,
		paddingLeft: 16,
		paddingRight: 16,
		marginRight: 4,
		marginBottom: 12,
		borderWidth: 0,
		backgroundColor: '#fff',
		shadowColor: '#000',
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
		color: '#4E4E4E',
	},
});
