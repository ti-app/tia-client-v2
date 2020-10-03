import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BorderView } from '../../../shared';
import colors, { blue } from '../../../../theme/colors';
import variables from '../../../../theme/variables';

const ActivityListItem = ({ item }) => {
	return (
		<BorderView style={activityListItemStyles.container} show={false} color="orange">
			<View>
				<View style={{ height: '100%' }}>
					<View style={{ height: '20%', borderColor: blue, borderRightWidth: 4 }} />
					<View style={{ height: '80%', borderColor: blue, borderRightWidth: 4, opacity: 0.5 }} />
				</View>
			</View>
			<View>
				<BorderView style={activityListItemStyles.iconContainer} show={false}>
					<MaterialCommunityIcons name="palm-tree" color={blue} size={32} style={{ padding: 4 }} />
				</BorderView>
			</View>
			<View style={activityListItemStyles.detailContainer}>
				<Text style={activityListItemStyles.activityTitle}>Updated a plant</Text>
				<Text style={activityListItemStyles.activityDescription}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, aperiam!
				</Text>
				<Text style={activityListItemStyles.activityTime}>Oct 03, 2020 04:19 PM</Text>
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
		backgroundColor: colors.surface,
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
	return (
		<View style={[{ flex: 1 }]}>
			<View style={styles.container}>
				<FlatList
					data={[
						{ key: 'Devin' },
						{ key: 'Dan' },
						{ key: 'Dominic' },
						{ key: 'Jackson' },
						{ key: 'James' },
						{ key: 'Joel' },
						{ key: 'John' },
						{ key: 'Jillian' },
						{ key: 'Jimmy' },
						{ key: 'Julie' },
					]}
					renderItem={({ item }) => <ActivityListItem item={item} />}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: variables.space.base,
		backgroundColor: colors.surface,
		// width: '100%',
	},
});
export default MyActivities;
