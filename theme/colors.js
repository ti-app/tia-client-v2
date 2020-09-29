import Color from 'color';

export const white = '#FFFFFF';
export const black = '#000000';
export const blue = '#1C53A9';
export const gray = '#8B8B8B';
export const darkGray = '#4E4E4E';
export const green = '#34A5AC';
export const yellow = '#E39B13';
export const red = '#E32B13';

// This values are not required by react native paper but have been
// added for custom use in components.
const customColorValues = {
	tint: blue,
	headingText: black,
	sectionHeadingText: gray,
	secondaryText: darkGray,
};

export default {
	primary: blue,
	success: green,
	error: red,
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
	...customColorValues,
};
