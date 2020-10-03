import { StyleSheet } from 'react-native';
import variables from '../../../theme/variables';
import * as colors from '../../../theme/colors';

const styles = StyleSheet.create({
	autoCompleteSearchContainer: {
		width: '100%',
	},
	searchContainer: {},
	searchBar: {},
	resultsContainer: {
		position: 'relative',
	},
	results: {
		width: '100%',
		backgroundColor: colors.white,
	},
	resultRow: {
		width: '100%',
		backgroundColor: colors.white,
		paddingVertical: variables.space.base,
		paddingHorizontal: variables.space.small,
	},
	resultRowBottomBorder: {
		borderBottomColor: colors.blue,
		borderBottomWidth: 1,
	},
	resultRowText: {
		color: colors.darkGray,
		fontSize: variables.font.large,
	},
});

export default styles;
