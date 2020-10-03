import { DefaultTheme } from 'react-native-paper';
import * as colors from './colors';
import tiaFonts from './font';

export default {
	...DefaultTheme,
	roundness: 4,
	colors: colors.theme,
	animation: {
		scale: 1.0,
	},
	fonts: tiaFonts,
};
