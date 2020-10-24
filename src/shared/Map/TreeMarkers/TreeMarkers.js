import React from 'react';
import Tree from '../Tree/Tree';
import TreeCluster from '../TreeCluster/TreeCluster';

const TreeMarkers = ({
	treeGroupData,
	selectedTreeGroups,
	enableSelection,
	onTreeGroupsSelect,
	onTreePress,
}) => {
	const handleSelect = (groupId, treeCount) => {
		onTreeGroupsSelect(groupId, treeCount);
	};

	return treeGroupData.map((_treeGroup) => {
		const { location, trees, _id } = _treeGroup;
		const markerCoords = {
			latitude: location.coordinates[1],
			longitude: location.coordinates[0],
		};

		if (trees.length === 1) {
			return (
				<Tree
					key={trees[0]._id}
					coordinate={markerCoords}
					selected={enableSelection && selectedTreeGroups[_id]}
					onPress={() => {
						if (enableSelection) {
							handleSelect(_id, trees.length);
						} else {
							onTreePress(_id);
						}
					}}
				/>
			);
		}

		return (
			<TreeCluster
				key={_id}
				coordinate={markerCoords}
				treeCount={trees.length}
				selected={enableSelection && selectedTreeGroups[_id]}
				onPress={() => {
					if (enableSelection) {
						handleSelect(_id, trees.length);
					}
				}}
			/>
		);
	});
};

export default TreeMarkers;
