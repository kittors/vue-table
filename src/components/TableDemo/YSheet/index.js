import { cssPrefix } from './constant';
import { Widget } from './lib/Widget';
import { copy, isString } from './utils/sheetUtils';
import { YWork } from './work/YWork';
import { h } from './lib/Element';
import { YDraw } from './draw/YDraw';
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
		if (isString(el)) {
			el = document.querySelector(el);
		}
		//将this.el插入到el下 插入子节点
		h(el).childrenNodes(this);
		//执行创建sheet
		this.xWork = new YWork(this.options.workConfig);
		this.attach(this.xWork);
	}
}

YSheet.YDraw = YDraw;

if (window) {
	window.YSheet = YSheet;
}

export default YSheet;
