import Color from 'color';

import { DefaultTheme } from 'react-native-paper';
import { white, black, blue, red, gray, green } from './colors';

export default {
	...DefaultTheme,
	roundness: 4,
	colors: {
		primary: blue,
		success: green,
		error: red,
		accent: gray, // TODO: Confirm the accent color from design
		background: white,
		surface: white,
		text: black,
		onBackground: black,
		onSurface: black,
		disabled: Color(black).alpha(0.26).rgb().string(),
		placeholder: Color(black).alpha(0.54).rgb().string(),
		backdrop: Color(black).alpha(0.5).rgb().string(),
		notification: blue,
	},
	animation: {
		scale: 1.0,
	},
};
