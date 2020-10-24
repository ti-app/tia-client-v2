import React, { useState, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import {
	Avatar,
	Title,
	Subheading,
	Button,
	Text,
	IconButton,
	TouchableRipple,
	Dialog,
	Portal,
	Paragraph,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BorderView } from '../../shared';
import * as colors from '../../../theme/colors';
import { getTreeDetail } from '../../utils/apiClient';
import styles from './TreeDetail.style';

const SAMPLE_IMAGE_URL =
	'https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const photoGalleryImages = new Array(5).fill(SAMPLE_IMAGE_URL);

const CircleIcon = ({ iconName, label, color, size = 48, onPress }) => {
	return (
		<View
			show={false}
			style={{
				alignItems: 'center',
			}}
		>
			<TouchableRipple
				style={{
					height: size,
					width: size,
					borderRadius: size / 2,
					borderColor: color,
					borderWidth: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
				// rippleColor="rgba(0, 0, 0, .32)"
				// borderless
				onPress={onPress}
			>
				{/* <IconButton
					icon={iconName}
					size={size / 2}
					color={color}
					onPress={() => console.log('Pressed')}
				/> */}
				<MaterialCommunityIcons name={iconName} size={size / 2} color={color} />
			</TouchableRipple>
			<View>
				<Text
					style={{
						color: color,
					}}
				>
					{label}
				</Text>
			</View>
		</View>
	);
};

const TreeGallery = ({ treeImages = photoGalleryImages }) => {
	const GRID_COLUMNS = 3;
	const renderPhotoItem = ({ item }) => {
		return (
			<View
				style={{
					flex: 1 / GRID_COLUMNS,
					padding: 4,
				}}
			>
				<Image source={{ uri: item }} style={{ aspectRatio: 1, borderRadius: 8 }} />
			</View>
		);
	};
	return (
		<View>
			<Title>Plant Photo Gallery</Title>
			<FlatList data={treeImages} renderItem={renderPhotoItem} numColumns={GRID_COLUMNS} />
		</View>
	);
};

const TreeDetail = ({ route, navigation }) => {
	// const { treeId } = route.params;
	// const [treeData, setTreeData] = useState({});
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	// useEffect(() => {
	// 	// getTreeDetail(treeId)
	// 	// 	.then((res) => {
	// 	// 		const { data } = res;
	// 	// 		setTreeData(data[0]);
	// 	// 	})
	// 	// 	.catch((e) => {
	// 	// 		console.log(e);
	// 	// 	});
	// }, []);

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<View style={styles.imageNameContainer}>
					<Avatar.Image size={64} source={{ uri: SAMPLE_IMAGE_URL }} />
					<View
						style={{
							marginLeft: 24,
						}}
					>
						{/* <Title>{treeData._id}</Title> */}
						{/* <Subheading>Added by: {treeData.createdBy}</Subheading> */}
						<Title>Neem Tree</Title>
						<Subheading>Added by: Murli</Subheading>
					</View>
				</View>
				<View>{/* <Button mode="contained">Watered</Button> */}</View>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					marginVertical: 16,
				}}
			>
				<CircleIcon iconName="pencil-outline" label="Edit" color={colors.blue} />
				<CircleIcon
					iconName="delete-outline"
					label="Delete"
					color={colors.blue}
					onPress={() => {
						setShowDeleteDialog(true);
					}}
				/>
				<CircleIcon iconName="image-plus" label="Add Photo" color={colors.blue} />
				<CircleIcon
					iconName="history"
					label="Activity"
					color={colors.blue}
					onPress={() => {
						navigation.navigate('TreeActivity');
					}}
				/>
			</View>
			<View
				style={{
					marginVertical: 16,
				}}
			>
				<View
					style={{
						borderWidth: 1,
						borderColor: colors.gray,
						borderRadius: 8,
						paddingVertical: 16,
						paddingHorizontal: 8,
						alignItems: 'center',
					}}
				>
					<Title>Please don’t forget to water me</Title>
					<Subheading>Last watered on Jan 02,2020</Subheading>
				</View>
			</View>
			<BorderView style={{ flex: 1 }} show={false}>
				<TreeGallery />
			</BorderView>
			<Portal>
				<Dialog
					visible={showDeleteDialog}
					onDismiss={() => {
						setShowDeleteDialog(false);
					}}
				>
					<Dialog.Title>Delete</Dialog.Title>
					<Dialog.Content>
						<Paragraph>Are you sure you want to delete this tree?</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => console.log('Cancel')}>Cancel</Button>
						<Button onPress={() => console.log('Ok')} color={colors.red}>
							Delete
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

export default TreeDetail;
