import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import styles from './Tree.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as colors from '../../../../theme/colors';
import variables from '../../../../theme/variables';

const Tree = ({ coordinate, onPress, selected }) => {
	return (
		<Marker tracksViewChanges={false} coordinate={coordinate} onPress={onPress}>
			<View style={styles.treeMarkerContainer}>
				<View style={[styles.treeMarkerCircle, selected ? styles.selectedMarkerCircle : null]}>
					{selected && (
						<MaterialCommunityIcons
							style={styles.selectedIcon}
							name="check"
							color={colors.white}
							size={variables.font.large}
						/>
					)}
				</View>
				<View style={[styles.treeMarkerBottomPin, selected ? styles.selectedMarkerPin : null]} />
			</View>
		</Marker>
	);
};

export default Tree;
