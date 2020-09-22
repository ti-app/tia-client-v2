import React from 'react';
import { View } from 'react-native';

const BorderView = ({ show = true, style, color = 'red', children, ...restProps }) => {
	return (
		<View {...restProps} style={[style, { borderColor: color, borderWidth: show ? 1 : 0 }]}>
			{children}
		</View>
	);
};

export default BorderView;
