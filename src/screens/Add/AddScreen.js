import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import AddPanel from './AddPanel';
import styles from './AddScreen.style';

const AddScreen = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const onChangeSearch = (query) => setSearchQuery(query);

	const addSheetRef = useCallback((node) => {
		if (node !== null) {
			addSheetRef.current = node;
			setTimeout(() => {
				addSheetRef.current.snapTo(1);
				setTimeout(() => {
					addSheetRef.current.snapTo(2);
				}, 50);
			}, 50);
		}
	}, []);

	const AddSheet = () => {
		return (
			<>
				<View style={styles.addSheetHandleContainer}>
					<View style={styles.addSheetHandle} />
					<AddPanel onTabClick={() => addSheetRef.current.snapTo(1)} />
				</View>
			</>
		);
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.topBarContainer}>
					<Searchbar
						placeholder="Search Location"
						onChangeText={onChangeSearch}
						value={searchQuery}
						style={styles.searchBar}
					/>
					<View style={styles.topBarIconContainer}>
						<MaterialCommunityIcons name="tune" size={26} />
					</View>
					<View style={styles.topBarIconContainer}>
						<MaterialCommunityIcons name="bell-outline" size={26} />
					</View>
				</View>
			</View>
			<BottomSheet
				ref={addSheetRef}
				snapPoints={[450, 300, 80]}
				initialSnap={2}
				borderRadius={10}
				renderContent={AddSheet}
			/>
		</>
	);
};

export default AddScreen;
