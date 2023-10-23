import { cssPrefix } from './constant';
import { Widget } from './lib/Widget';
import { copy } from './utils/sheetUtils';
import { YWork } from './work/YWork';
//必要的默认配置
const settings = {};

class YSheet extends Widget {
	/**
	 *
	 * @param {*} el 容器div
	 * @param {*} settings 配置项
	 */
	constructor(el, options) {
		//在容器下面新建一个子容器
		super(`${cssPrefix}`, 'div', true);
		//将配置和默认配置合并 后面数据属性会覆盖前面的数据属性
		this.options = copy({}, settings, options);
		//执行创建sheet
		this.xWork = new YWork(this.options.workConfig);
	}
}

export default YSheet;
