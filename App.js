import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppContent from './src';
import store from './src/store';
import customTheme from './theme';

const App = () => {
	return (
		<StoreProvider store={store}>
			<NavigationContainer>
				<PaperProvider theme={customTheme}>
					<AppContent />
				</PaperProvider>
			</NavigationContainer>
		</StoreProvider>
	);
};

export default App;
