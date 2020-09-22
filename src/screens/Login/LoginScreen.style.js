import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	loginScreen: {
		flex: 1,
		justifyContent: 'center',
	},
	loginLabel: {
		textAlign: 'center',
		margin: 20,
	},
	socialLoginButton: {
		width: '80%',
		maxWidth: 300,
		margin: 20,
		alignSelf: 'center',
	},
	socialLoginButtonText: {
		color: '#FFF',
	},
	facebookButton: {
		backgroundColor: '#3C5A99',
	},
	googleButton: {
		backgroundColor: '#BD4A39',
	},
});
