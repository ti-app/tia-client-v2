import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { TabView as RNTabView, SceneMap } from 'react-native-tab-view';
import { Text } from 'react-native-paper';
import styles from './TabView.style';

const TabView = ({ tabConfig, onTabClick, ...restProps }) => {
	const [index, setIndex] = useState(0);
	const initialLayout = { width: Dimensions.get('window').width };

	const MaterialTabBar = ({ navigationState }) => {
		return (
			<View style={styles.materialTabBar}>
				{navigationState.routes.map((route, i) => {
					return (
						<TouchableOpacity
							style={styles.materialTab}
							onPress={() => {
								setIndex(i);
								if (onTabClick) {
									onTabClick();
								}
							}}
							key={i}
						>
							<Text style={styles.tabText}>{route.title}</Text>
							{i === index && <View style={styles.tabHighlight} />}
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	const tabRoutes = useMemo(() => {
		return tabConfig.map((tab) => ({
			key: tab.key,
			title: tab.title,
		}));
	}, [tabConfig]);

	const tabSceneMap = useMemo(() => {
		const sceneMap = tabConfig.reduce((acc, tab) => {
			acc[tab.key] = tab.component;
			return acc;
		}, {});
		console.log('tabSceneMap -> sceneMap', sceneMap);
		return SceneMap(sceneMap);
	}, [tabConfig]);

	return (
		<RNTabView
			renderTabBar={MaterialTabBar}
			renderScene={tabSceneMap}
			navigationState={{ index, routes: tabRoutes }}
			onIndexChange={setIndex}
			initialLayout={initialLayout}
		/>
	);
};

export default TabView;
