import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './NearbyTreesPanel.style';

const NearbyTreesPanel = ({ healthy = 0, weak = 0, almostDead = 0 }) => {
	return (
		<View>
			<Text style={styles.treeCountTitle}>Trees near by you</Text>
			<View style={styles.treeCountContainer}>
				<View style={styles.treeCountItem}>
					<Text style={styles.treeCountText}>{healthy + weak + almostDead}</Text>
					<Text style={styles.treeCountLabel}>All</Text>
				</View>
				<View style={styles.treeCountItem}>
					<Text style={[styles.treeCountText, styles.healthy]}>{healthy}</Text>
					<Text style={styles.treeCountLabel}>Healthy</Text>
				</View>
				<View style={styles.treeCountItem}>
					<Text style={[styles.treeCountText, styles.weak]}>{weak}</Text>
					<Text style={styles.treeCountLabel}>Weak</Text>
				</View>
				<View style={styles.treeCountItem}>
					<Text style={[styles.treeCountText, styles.almostDead]}>{almostDead}</Text>
					<Text style={styles.treeCountLabel}>Almost Died</Text>
				</View>
			</View>
		</View>
	);
};

export default NearbyTreesPanel;
