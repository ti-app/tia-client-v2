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
			count: treesInCluster,
			lat,
			data: treeGroupData,
			lng,
			_id: treeClusterId,
		} = _treeCluster;

		const treeClusterCoords = {
			latitude: lat,
			longitude: lng,
		};

		if (treeGroupData) {
			const {
				count: treesInTreeGroup,
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
					treeCount={treesInTreeGroup || 1} // FIXME: || 1 part is temporary to deal with missing field
					selected={enableSelection && selectedTreeGroups[treeGroupId] !== undefined}
					health={treeGroupHealth}
					onPress={() => {
						if (enableSelection) {
							onTreeGroupsSelect(treeGroupId, treesInTreeGroup || 1, treeGroupCoords); // FIXME: || 0 part is temporary to deal with missing field
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
				treeCount={treesInCluster || 0} // FIXME: || 0 part is temporary to deal with missing field
				onPress={() => onClusterPress(treeGroupClusterData)}
			/>
		);
	});
};

export default TreeMarkers;
