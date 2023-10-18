import { Widget } from '../lib/Widget';
import { cssPrefix } from '../const/Constant';

class YSheet extends Widget {
	/**
	 * YSheet
	 * @param el
	 * @param options
	 */
	constructor(el, options) {
		super(`${cssPrefix}`, 'div', true);
	}

	/**
	 * destroy
	 */
	destroy() {
		super.destroy();
		this.xWork.destroy();
		this.focusManage.destroy();
		this.tabNameGen.clear();
	}
}

export { YSheet };
