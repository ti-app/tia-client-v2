import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ActivityList, BorderView } from '../../../shared';
import { getTreeActivity } from '../../../utils/apiClient';

const TreeActivity = ({ route }) => {
	const [treeActivity, setTreeActivity] = useState([]);
	useEffect(() => {
		const treeId = '5deb80fa6a3a2900391a1d37';
		getTreeActivity(treeId)
			.then((res) => {
				setTreeActivity(res.data.activities);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);
	return (
		<BorderView
			style={{
				flex: 1,
				padding: 8,
				backgroundColor: '#fff',
			}}
		>
			<ActivityList activities={treeActivity} />
		</BorderView>
	);
};

export default TreeActivity;
