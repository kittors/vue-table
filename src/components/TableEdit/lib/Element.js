import { SheetUtils } from '../utils/sheetUtils';

class Element {
	/**
	 * Element
	 * @param tag //节点类型 /
	 * @param className //class选择器名称
	 */
	constructor(tag, className = '') {
		console.log(tag, className);
		if (typeof tag === 'string') {
			this.el = document.createElement(tag);
			if (className) {
				this.el.className = className;
			}
		} else {
			this.el = tag; //如果不是dom节点
		}
		this.map = {};
		console.log(this)
	}
}

export { Element };
