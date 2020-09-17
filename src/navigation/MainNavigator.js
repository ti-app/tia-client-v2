import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabNavigator from './HomeTabNavigator';

const MainStack = createStackNavigator();

const MainNavigator = () => {
	return (
		<MainStack.Navigator>
			<MainStack.Screen name="Home" component={HomeTabNavigator} />
		</MainStack.Navigator>
	);
};

export default MainNavigator;
