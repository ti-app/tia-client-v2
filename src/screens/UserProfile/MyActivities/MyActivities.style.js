import { StyleSheet } from 'react-native';
import * as colors from '../../../../theme/colors';
import variables from '../../../../theme/variables';

export const activityListItemStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	detailContainer: {
		height: '100%',
	},
	iconContainer: {
		borderRadius: 4,
		elevation: 2,
		backgroundColor: colors.theme.surface,
		marginLeft: variables.space.base,
		marginRight: variables.space.small,
	},
	activityTitle: {
		fontSize: variables.font.base,
		color: colors.headingText,
	},
	activityDescription: {
		marginTop: variables.space.xs,
		marginBottom: variables.space.base,
		color: colors.sectionHeadingText,
		fontSize: variables.font.small,
	},
	activityTime: {
		marginBottom: variables.space.large,
		color: colors.sectionHeadingText,
		fontSize: variables.font.small,
	},
	borderSmall: {
		height: '20%',
		borderColor: colors.blue,
		borderRightWidth: 4,
	},
	borderLarge: {
		height: '80%',
		borderColor: colors.blue,
		borderRightWidth: 4,
		opacity: 0.5,
	},
});

export const myActivityStyles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: variables.space.base,
		backgroundColor: colors.theme.surface,
		// width: '100%',
	},
});
