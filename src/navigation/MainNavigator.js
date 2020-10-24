import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabNavigator from './HomeTabNavigator';
import TreeDetailScreen from '../screens/TreeDetail/TreeDetail';
import TreeActivityScreen from '../screens/TreeDetail/TreeActivity/TreeActivity';

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
			<MainStack.Screen
				name="TreeDetail"
				component={TreeDetailScreen}
				options={{
					title: 'Tree Detail',
				}}
			/>
			<MainStack.Screen
				name="TreeActivity"
				component={TreeActivityScreen}
				options={{
					title: 'Tree Activity',
				}}
			/>
		</MainStack.Navigator>
	);
};

export default MainNavigator;
