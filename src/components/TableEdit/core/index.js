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
}

export { YSheet };
