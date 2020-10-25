import * as colors from '../../theme/colors';

export const getColorByTreeStatus = (status) =>
	({
		healthy: colors.green,
		adequate: colors.green,
		average: colors.yellow,
		weak: colors.yellow,
		almostDead: colors.red,
	}[status]);