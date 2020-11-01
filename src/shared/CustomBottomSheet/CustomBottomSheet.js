import React, { useRef } from 'react';
import { View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import styles from './CustomBottomSheet.style';

const CustomBottomSheet = ({
	renderContent,
	snapPoints = [450, 300, 120, 80],
	initialSnap = 2,
	...props
}) => {
	const sheetRef = useRef();

	const SheetComponent = () => {
		return (
			<View style={styles.sheetHandleContainer}>
				<View style={styles.sheetHandle} />
				{renderContent(sheetRef)}
			</View>
		);
	};

	return (
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			initialSnap={initialSnap}
			borderRadius={8}
			renderContent={SheetComponent}
			{...props}
		/>
	);
};

export default CustomBottomSheet;
