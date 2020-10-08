import Color from 'color';

export const white = '#FFFFFF';
export const black = '#000000';
export const blue = '#1C53A9';
export const lightGray = '#E6E6E6';
export const gray = '#8B8B8B';
export const darkGray = '#4E4E4E';
export const green = '#34A5AC';
export const darkGreen = '#226d71';
export const yellow = '#E39B13';
export const red = '#E32B13';

// This values are not required by react native paper but have been
// added for custom use in components.
export const tint = blue;
export const headingText = black;
export const sectionHeadingText = gray;
export const secondaryText = darkGray;
export const success = green;
export const warning = yellow;
export const error = red;

export const theme = {
	primary: blue,
	accent: gray,
	background: white,
	surface: white,
	text: black,
	onBackground: black,
	onSurface: black,
	disabled: Color(black).alpha(0.26).rgb().string(),
	placeholder: Color(black).alpha(0.54).rgb().string(),
	backdrop: Color(black).alpha(0.5).rgb().string(),
	notification: blue,
};
