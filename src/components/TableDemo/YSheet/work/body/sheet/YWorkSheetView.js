import { cssPrefix } from '../../../constant';
import { copy } from '../../../utils/sheetUtils';
import { Widget } from '../../../lib/Widget';

const settings = {
	showMenu: true, //是否显示菜单
};

class YWorkSheetView extends Widget {
	constructor(option) {
		super(`${cssPrefix}-sheet-view`);
		this.options = copy({}, settings, option);
        console.log(this)
	}

	onAttach() {
		console.log('初始化');
	}
}

export { YWorkSheetView };
