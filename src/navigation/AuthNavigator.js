import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login/LoginScreen';
// import ResetPasswordScreen from '../screens/ResetPassword/ResetPasswordScreen';
// import RegisterScreen from '../screens/Register/RegisterScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen name="Login" component={LoginScreen} />
			{/* <AuthStack.Screen name="Register" component={RegisterScreen} /> */}
			{/* <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
		</AuthStack.Navigator>
	);
};

export default AuthNavigator;
