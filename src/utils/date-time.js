export const padWithZeros = (number, length) => {
	let str = String(number);
	while (str.length < length) str = 0 + str;
	return str;
};

export const formatISOTimeStamp = (timestamp, format = 'date') => {
	const date = new Date(timestamp);
	const hour = date.toLocaleTimeString('en-GB', {
		hour: '2-digit',
	});
	const minute = date.toLocaleTimeString('en-GB', {
		minute: '2-digit',
	});
	const year = date.toLocaleDateString('en-GB', {
		year: 'numeric',
	});
	const month = date.toLocaleDateString('en-GB', {
		month: 'short',
	});
	const day = date.toLocaleDateString('en-GB', {
		day: '2-digit',
	});

	switch (format) {
		case 'date':
			return `${month} ${day}`;
		case 'date-hour-minute':
			return `${month} ${day}, ${padWithZeros(hour, 2)}:${padWithZeros(minute, 2)}`;
		case 'hour-minute':
			return `${padWithZeros(hour, 2)}:${padWithZeros(minute, 2)}`;
		case 'date-day-month-year':
			return `${month} ${day}, ${year}`;
		case 'date-day-month-year-hour-minute':
			return `${month} ${day}, ${year} ${padWithZeros(hour, 2)}:${padWithZeros(minute, 2)}`;
		default:
			return `${month} ${day}, ${year}`;
	}
};
