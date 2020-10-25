import React from 'react';
import TreeCluster from '../TreeCluster/TreeCluster';
import TreeGroup from '../TreeGroup/TreeGroup';

const TreeMarkers = ({
	treeGroupClusterData,
	selectedTreeGroups,
	enableSelection,
	onTreeGroupsSelect,
	onTreeGroupPress,
	onClusterPress,
}) => {
	return treeGroupClusterData.map((_treeCluster) => {
		const {
			treeGroupCount,
			treeCount,
			lat,
			data: treeGroupData,
			lng,
			_id: treeClusterId,
		} = _treeCluster;

		const treeClusterCoords = {
			latitude: lat,
			longitude: lng,
		};

		if (treeGroupCount === 1 && treeGroupData) {
			const {
				_id: treeGroupId,
				location: treeGroupLocation,
				health: treeGroupHealth,
			} = treeGroupData;

			const treeGroupCoords = {
				latitude: treeGroupLocation.coordinates[1],
				longitude: treeGroupLocation.coordinates[0],
			};

			return (
				<TreeGroup
					key={treeGroupId}
					coordinate={treeGroupCoords}
					treeCount={treeCount}
					selected={enableSelection && selectedTreeGroups[treeGroupId] !== undefined}
					health={treeGroupHealth}
					onPress={() => {
						if (enableSelection) {
							onTreeGroupsSelect(treeGroupId, treeCount, treeGroupCoords);
						} else {
							onTreeGroupPress(treeGroupId);
						}
					}}
				/>
			);
		}

		return (
			<TreeCluster
				id={treeClusterId}
				key={treeClusterId}
				coordinate={treeClusterCoords}
				treeCount={treeCount}
				onPress={() => onClusterPress(treeGroupClusterData)}
			/>
		);
	});
};

export default TreeMarkers;
