import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './TreeGroup.style';
import * as colors from '../../../../theme/colors';
import variables from '../../../../theme/variables';
import { getColorByTreeStatus } from '../../../utils/colorMapping';

const TreeGroup = ({ coordinate, onPress, health, treeCount, selected }) => {
	const markerRef = useRef();

	const statusColour = getColorByTreeStatus(health);

	useEffect(() => {
		markerRef.current.redraw();
	}, [health]);

	return (
		<Marker ref={markerRef} tracksViewChanges={false} coordinate={coordinate} onPress={onPress}>
			<View style={styles.treeGroupMarkerContainer}>
				<View
					style={[
						styles.treeGroupMarkerCircle,
						selected ? styles.selectedMarkerCircle : null,
						{ backgroundColor: statusColour },
					]}
				>
					{!selected && (
						<Text style={styles.treeGroupNumber}>{treeCount > 9 ? '9+' : treeCount}</Text>
					)}
					{selected === true && (
						<MaterialCommunityIcons
							style={styles.selectedIcon}
							name="check"
							color={colors.white}
							size={variables.font.large}
						/>
					)}
				</View>
				<View
					style={[
						styles.treeGroupMarkerBottomPin,
						selected ? styles.selectedMarkerPin : null,
						{ borderTopColor: statusColour },
					]}
				/>
			</View>
		</Marker>
	);
};

export default TreeGroup;
