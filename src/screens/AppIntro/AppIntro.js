import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Button, Title, Text, Avatar, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BorderView } from '../../shared';

const introSlides = [
	{
		key: 'one',
		title: 'Intro 1',
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
		image: 'palm-tree',
	},
	{
		key: 'two',
		title: 'Intro 2',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
		image: 'pine-tree',
	},
	{
		key: 'three',
		title: 'Intro 3',
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
		image: 'tree',
	},
];

const AppIntro = () => {
	const navigation = useNavigation();
	const handleIntroDone = () => {};
	const renderItem = ({ item }) => {
		return (
			<View style={styles.slide}>
				<Avatar.Icon size={256} icon={item.image} style={styles.image} />
				<Title style={styles.title}>{item.title}</Title>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		);
	};
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flexGrow: 9 }}>
				<AppIntroSlider
					renderItem={renderItem}
					data={introSlides}
					onDone={handleIntroDone}
					renderNextButton={() => null}
					renderDoneButton={() => null}
					activeDotStyle={styles.activeDotStyle}
				/>
			</View>
			<View
				style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
				color="blue"
				show
			>
				<Button
					mode="outlined"
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					Login
				</Button>
			</View>
		</View>
	);
};

export default AppIntro;

const styles = StyleSheet.create({
	slide: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		backgroundColor: Colors.green400,
	},
	text: {
		textAlign: 'center',
	},
	activeDotStyle: {
		backgroundColor: Colors.blue500,
	},
});
