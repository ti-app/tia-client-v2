import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from './AddPanel.style';

const AddPanel = ({ onTabClick }) => {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'addPlant', title: 'Add Plants' },
		{ key: 'addPlantationSite', title: 'Add Plantation Site' },
	]);

	const AddTabBar = ({ navigationState }) => {
		return (
			<View style={{ flexDirection: 'row', paddingTop: 16, paddingBottom: 16 }}>
				{navigationState.routes.map((route, i) => {
					return (
						<TouchableOpacity
							style={{ alignItems: 'center', paddingRight: 24 }}
							onPress={() => {
								setIndex(i);
								onTabClick();
							}}
							key={i}
						>
							<Text style={{ fontSize: 14 }}>{route.title}</Text>
							{i === index && (
								<View
									style={{
										width: '100%',
										height: 4,
										borderRadius: 4,
										backgroundColor: '#1C53A9',
										marginTop: 4,
									}}
								/>
							)}
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	const SelectMethodForPlants = () => {
		return (
			<View style={styles.selectMethodContainer}>
				<Text style={{ color: '#4E4E4E' }}> Select method to add plants</Text>
				<View style={styles.selectMethodButtonsContainer}>
					<Button
						style={styles.selectMethodButton}
						labelStyle={styles.selectMethodButtonText}
						uppercase={false}
						mode="outlined"
					>
						Single
					</Button>
					<Button
						style={styles.selectMethodButton}
						labelStyle={styles.selectMethodButtonText}
						uppercase={false}
						mode="outlined"
					>
						Line
					</Button>
					<Button
						style={styles.selectMethodButton}
						labelStyle={styles.selectMethodButtonText}
						uppercase={false}
						mode="outlined"
					>
						Block
					</Button>
					<Button
						style={styles.selectMethodButton}
						labelStyle={styles.selectMethodButtonText}
						uppercase={false}
						mode="outlined"
					>
						Method 3
					</Button>
					<Button
						style={styles.selectMethodButton}
						labelStyle={styles.selectMethodButtonText}
						uppercase={false}
						mode="outlined"
					>
						Method 4
					</Button>
					<Button
						style={styles.selectMethodButton}
						labelStyle={styles.selectMethodButtonText}
						uppercase={false}
						mode="outlined"
					>
						Method 5
					</Button>
				</View>
			</View>
		);
	};

	const AddTabMap = SceneMap({
		addPlant: SelectMethodForPlants,
		addPlantationSite: SelectMethodForPlants,
	});

	const initialLayout = { width: Dimensions.get('window').width };

	return (
		<TabView
			renderTabBar={AddTabBar}
			renderScene={AddTabMap}
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			initialLayout={initialLayout}
		/>
	);
};

export default AddPanel;
