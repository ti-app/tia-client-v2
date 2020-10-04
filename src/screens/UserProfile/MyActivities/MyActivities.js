import React, { useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { BorderView } from '../../../shared';
import * as colors from '../../../../theme/colors';
import variables from '../../../../theme/variables';
import { selectUserActivity } from '../../../store/reducers/userActivity.reducer';
import * as userActivityActions from '../../../store/actions/userActivity.action';
import { formatISOTimeStamp } from '../../../utils/date-time';

const activityTypeMap = {
	TREE_ADDED: {
		title: 'Added a tree',
		icon: 'palm-tree',
		description: 'You added a tree',
	},
	TREE_DELETED: {
		title: 'Deleted a tree',
		icon: 'delete-outline',
		description: 'You deleted a tree',
	},
	TREE_WATERED: {
		title: 'Watered a tree',
		icon: 'watering-can-outline',
		description: 'You watered a tree',
	},
	TREE_UPDATED: {
		title: 'Updated a tree',
		icon: 'pencil-outline',
		description: 'You Updated a tree',
	},
	TREE_FERTILIZED: {
		title: 'Fertilized a tree',
		icon: 'watering-can-outline',
		description: 'You fertilized a tree',
	},
	SITE_ADDED: {
		title: 'Added a site',
		icon: 'plus-box-multiple',
		description: 'You added a plantation site',
	},
	SITE_DELETED: {
		title: 'Deleted a site',
		icon: 'delete-outline',
		description: 'You deleted a plantation site',
	},
	SITE_UPDATED: {
		title: 'Updated a site',
		icon: 'pencil-outline',
		description: 'You updated a plantation site',
	},
};

const ActivityListItem = ({ item }) => {
	const activityMeta = activityTypeMap[item.activity];
	// TODO: Add hour:minute in activity time
	return (
		<BorderView style={activityListItemStyles.container} show={false} color="orange">
			<View>
				<View style={{ height: '100%' }}>
					<View style={{ height: '20%', borderColor: colors.blue, borderRightWidth: 4 }} />
					<View
						style={{ height: '80%', borderColor: colors.blue, borderRightWidth: 4, opacity: 0.5 }}
					/>
				</View>
			</View>
			<View>
				<BorderView style={activityListItemStyles.iconContainer} show={false}>
					<MaterialCommunityIcons
						name={activityMeta.icon}
						color={colors.blue}
						size={32}
						style={{ padding: 4 }}
					/>
				</BorderView>
			</View>
			<View style={activityListItemStyles.detailContainer}>
				<Text style={activityListItemStyles.activityTitle}>{activityMeta.title}</Text>
				<Text style={activityListItemStyles.activityDescription}>{activityMeta.description}</Text>
				<Text style={activityListItemStyles.activityTime}>
					{formatISOTimeStamp(item.date, 'date-day-month-year')}
				</Text>
			</View>
		</BorderView>
	);
};

const activityListItemStyles = StyleSheet.create({
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
});

const MyActivities = () => {
	const dispatch = useDispatch();
	const userActivity = useSelector(selectUserActivity);
	const fetchUserActivity = useCallback(
		(...param) => dispatch(userActivityActions.fetchUserActivity(...param)),
		[dispatch]
	);

	useEffect(() => {
		const userId = auth().currentUser.uid;
		fetchUserActivity(userId);
	}, [fetchUserActivity]);

	return (
		<View style={[{ flex: 1 }]}>
			<View style={styles.container}>
				<FlatList data={userActivity} renderItem={({ item }) => <ActivityListItem item={item} />} />
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: variables.space.base,
		backgroundColor: colors.theme.surface,
		// width: '100%',
	},
});
export default MyActivities;
