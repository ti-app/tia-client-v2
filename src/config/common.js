import { API_BASE_URL } from '@env';

export default {
	api: {
		base: API_BASE_URL,
	},
	roles: {
		MODERATOR: 'moderator',
	},
	distributions: {
		SINGLE: 'single',
		LINE: 'line',
		RANDOM: 'random',
	},
	maxProximityDistance: 50, // in meters
	notificationAppState: {
		foreground: 'FOREGROUND',
		background: 'BACKGROUND',
		killed: 'KILLED',
		// dataOnly: 'DATA_ONLY',
	},
};
