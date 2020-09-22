import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenOne = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const onChangeSearch = (query) => setSearchQuery(query);
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<Searchbar
					placeholder="Search Location"
					onChangeText={onChangeSearch}
					value={searchQuery}
					style={{ flex: 4 }}
				/>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons name="tune" size={26} />
				</View>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons name="bell-outline" size={26} />
				</View>
			</View>
			<Text>Screen One</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		marginTop: 26,
		flexDirection: 'row',
		alignItems: 'center',
		// borderColor: 'red',
		// borderWidth: 1,
	},
	iconContainer: {
		marginLeft: 8,
		// borderColor: 'red',
		// borderWidth: 1,
		width: 38,
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 4,
		justifyContent: 'center',
		elevation: 4,
	},
});
export default ScreenOne;
