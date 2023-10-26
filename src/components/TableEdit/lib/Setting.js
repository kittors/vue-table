import { SheetUtils } from '../utils/sheetUtils';

const setting = {
	workConfing: {
		name: 'y-sheet',
	},
};

class Setting {
	constructor(options) {
		this.setting = SheetUtils.copy({}, setting, options);
	}
}

export { Setting };
