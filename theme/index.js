import { DefaultTheme } from 'react-native-paper';
import tiaColors from './colors';
import tiaFonts from './font';

export default {
	...DefaultTheme,
	roundness: 4,
	colors: tiaColors,
	animation: {
		scale: 1.0,
	},
	fonts: tiaFonts,
};
