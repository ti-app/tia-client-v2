import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ScreenTwo from '../screens/Sample/ScreenTwo';
import UserProfileScreen from '../screens/UserProfile/UserProfileScreen';
import AddScreen from '../screens/Add/AddScreen';
import WateringScreen from '../screens/Watering/WateringScreen';
import * as colors from '../../theme/colors';

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => {
	return (
		<HomeTab.Navigator
			labeled={true}
			shifting={false}
			activeColor={colors.theme.primary}
			barStyle={{ height: 56, backgroundColor: colors.theme.surface }}
		>
			<HomeTab.Screen
				name="Add"
				component={AddScreen}
				options={{
					tabBarLabel: 'Add',
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="add-photo-alternate" color={color} size={26} />
					),
				}}
			/>
			<HomeTab.Screen
				name="Watering"
				component={WateringScreen}
				options={{
					tabBarLabel: 'Watering',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="opacity" color={color} size={26} />
					),
				}}
			/>
			<HomeTab.Screen
				name="Feeds"
				component={ScreenTwo}
				options={{
					tabBarLabel: 'Feeds',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="text-box-outline" color={color} size={26} />
					),
				}}
			/>
			<HomeTab.Screen
				name="Profile"
				component={UserProfileScreen}
				options={{
					headerShown: true,
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account-box-outline" color={color} size={26} />
					),
				}}
			/>
			<HomeTab.Screen
				name="Settings"
				component={ScreenTwo}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="cog-outline" color={color} size={26} />
					),
				}}
			/>
		</HomeTab.Navigator>
	);
};

export default HomeTabNavigator;
