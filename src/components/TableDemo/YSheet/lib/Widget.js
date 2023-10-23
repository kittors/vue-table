import { Element } from './Element';
import { cssPrefix } from '../constant';

class Life extends Element {}

class Widget extends Life {
	/**
	 *
	 * @param {*} className class选择器名称
	 * @param {*} domType  DOM节点类型
	 * @param {*} $$rootFlag 是否是根节点
	 */
	constructor(className = '', domType = 'div', $$rootFlag = false) {
		if (typeof className === 'string') {
			//创建节点
			super(domType, `${cssPrefix}-widget ${className}`);
		}
		this.$$rootFlag = $$rootFlag;
	}
}

export { Widget };
