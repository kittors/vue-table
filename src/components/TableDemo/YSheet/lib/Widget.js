import { Element } from './Element';
import { cssPrefix } from '../constant';

class Life extends Element {
	//挂载到DOM时触发的生命周期事件
	onAttach() {}
}

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
		} else {
			super(className);
		}
		this.$$rootFlag = $$rootFlag;
	}

	/**
	 * 设置 parent widget
	 * @param widget
	 */
	parentWidget(widget) {
		if (widget) {
			this.data('parent', widget);
			return this;
		}
		return this.data('parent');
	}

	/**
	 * 追加节点
	 * @param args[]
	 */
	childrenNodes(...args) {
		args.forEach(ele => {
			if (ele.parentWidget) {
				ele.parentWidget(this);
			}
		});
		return super.childrenNodes(...args);
	}
	/**
	 * 追加节点
	 * 触发onAttach事件
	 * @param widget
	 */
	attach(widget) {
		this.childrenNodes(widget);
		widget.parentWidget(this);
		widget.onAttach(this);
	}
}

export { Widget };
