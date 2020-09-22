import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabNavigator from './HomeTabNavigator';

const MainStack = createStackNavigator();

const MainNavigator = () => {
	return (
		<MainStack.Navigator>
			<MainStack.Screen
				name="Home"
				component={HomeTabNavigator}
				options={{
					headerShown: false,
				}}
			/>
		</MainStack.Navigator>
	);
};

export default MainNavigator;
