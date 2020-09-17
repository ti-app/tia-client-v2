import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import ScreenOne from '../screens/Sample/ScreenOne';
import ScreenTwo from '../screens/Sample/ScreenTwo';
import UserProfileScreen from '../screens/UserProfile/UserProfileScreen';

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => {
	return (
		<HomeTab.Navigator>
			<HomeTab.Screen name="Add" component={ScreenOne} />
			<HomeTab.Screen name="Watering" component={ScreenTwo} />
			<HomeTab.Screen name="Feeds" component={ScreenTwo} />
			<HomeTab.Screen name="Profile" component={UserProfileScreen} />
			<HomeTab.Screen name="Settings" component={ScreenTwo} />
		</HomeTab.Navigator>
	);
};

export default HomeTabNavigator;
