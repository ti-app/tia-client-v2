import React from 'react';
import { View, Text, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CenterView from '../Views/CenterView';
import { formatISOTimeStamp } from '../../utils/date-time';
import * as colors from '../.../../../../theme/colors';
import { activityListItemStyles } from './ActivityList.style';

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

const ActivityList = ({ activities }) => {
	return (
		<FlatList
			data={activities}
			keyExtractor={(item) => `${item.date}`}
			contentContainerStyle={{ flexGrow: 1 }}
			ListEmptyComponent={() => (
				<CenterView>
					<Text>No Activities</Text>
				</CenterView>
			)}
			renderItem={({ item }) => <ActivityListItem item={item} />}
		/>
	);
};

export default ActivityList;
