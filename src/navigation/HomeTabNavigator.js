import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

import ScreenOne from '../screens/Sample/ScreenOne';
import ScreenTwo from '../screens/Sample/ScreenTwo';
import UserProfileScreen from '../screens/UserProfile/UserProfileScreen';
import AppIntro from '../screens/AppIntro/AppIntro';

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => {
	const { colors } = useTheme();

	return (
		<HomeTab.Navigator
			labeled={true}
			activeColor={colors.primary}
			barStyle={{ backgroundColor: colors.surface }}
		>
			<HomeTab.Screen
				name="Add"
				component={ScreenOne}
				options={{
					// headerShown: false,
					tabBarLabel: 'Add',
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="add-photo-alternate" color={color} size={26} />
					),
				}}
			/>
			<HomeTab.Screen
				name="Watering"
				component={AppIntro}
				options={{
					tabBarLabel: 'Water',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="opacity" color={color} size={26} />
					),
				}}
			/>
			<HomeTab.Screen
				name="Feeds"
				component={ScreenTwo}
				options={{
					tabBarLabel: 'Feed',
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
