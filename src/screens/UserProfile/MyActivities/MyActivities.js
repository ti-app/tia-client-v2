import React, { useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { BorderView, CenterView } from '../../../shared';
import { selectUserActivity } from '../../../store/reducers/userActivity.reducer';
import * as userActivityActions from '../../../store/actions/userActivity.action';
import { formatISOTimeStamp } from '../../../utils/date-time';
import * as colors from '../../../../theme/colors';
import { activityListItemStyles, myActivityStyles } from './MyActivities.style';

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
	// TODO: Add hour:minute in activity time with AM/PM
	// TODO: Add custom icon for activity
	return (
		<View style={activityListItemStyles.container}>
			<View>
				<View style={{ height: '100%' }}>
					<View style={activityListItemStyles.borderSmall} />
					<View style={activityListItemStyles.borderLarge} />
				</View>
			</View>
			<View>
				<View style={activityListItemStyles.iconContainer} show={false}>
					<MaterialCommunityIcons
						name={activityMeta.icon}
						color={colors.blue}
						size={32}
						style={{ padding: 4 }}
					/>
				</View>
			</View>
			<View style={activityListItemStyles.detailContainer}>
				<Text style={activityListItemStyles.activityTitle}>{activityMeta.title}</Text>
				<Text style={activityListItemStyles.activityDescription}>{activityMeta.description}</Text>
				<Text style={activityListItemStyles.activityTime}>
					{formatISOTimeStamp(item.date, 'date-day-month-year-hour-minute')}
				</Text>
			</View>
		</View>
	);
};

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
		<View style={myActivityStyles.container}>
			<FlatList
				data={userActivity}
				keyExtractor={(item) => `${item.date}`}
				contentContainerStyle={{ flexGrow: 1 }}
				ListEmptyComponent={() => (
					<CenterView>
						<Text>No Activities</Text>
					</CenterView>
				)}
				renderItem={({ item }) => <ActivityListItem item={item} />}
			/>
		</View>
	);
};

export default MyActivities;
