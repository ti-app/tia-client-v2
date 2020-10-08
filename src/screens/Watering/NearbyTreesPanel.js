import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './NearbyTreesPanel.style';

const NearbyTreesPanel = () => {
	return (
		<View>
			<Text style={styles.treeCountTitle}>Trees near by you</Text>
			<View style={styles.treeCountContainer}>
				<View style={styles.treeCountItem}>
					<Text style={styles.treeCountText}>81</Text>
					<Text style={styles.treeCountLabel}>Total trees</Text>
				</View>
				<View style={styles.treeCountItem}>
					<Text style={[styles.treeCountText, styles.healthy]}>81</Text>
					<Text style={styles.treeCountLabel}>Healthy tree</Text>
				</View>
				<View style={styles.treeCountItem}>
					<Text style={[styles.treeCountText, styles.weak]}>81</Text>
					<Text style={styles.treeCountLabel}>Weak tree</Text>
				</View>
				<View style={styles.treeCountItem}>
					<Text style={[styles.treeCountText, styles.almostDead]}>81</Text>
					<Text style={styles.treeCountLabel}>Almost Died</Text>
				</View>
			</View>
		</View>
	);
};

export default NearbyTreesPanel;
