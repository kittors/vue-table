import { Element } from './Element';
import { cssPrefix } from '../const/Constant';

class Life extends Element {
	onAttach() {}
}

class Widget extends Life {
	/**
	 * Widget
	 * @param className //class选择器名称
	 * @param nodeType //节点类型
	 * @param $$rootFlag  //是否是root 根DOM节点
	 */
	constructor(className = '', nodeType = 'div', $$rootFlag = false) {
		if (typeof className === 'string') {
			super(nodeType, `${cssPrefix}-widget ${className}`);
		} else {
			super(className);
		}
		this.$$rootFlag = $$rootFlag;
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

	/**
	 * 获取 root widget  获取最根部的widget
	 */
	getRootWidget() {
		let parent = this.data('parent');
		while (parent && !parent.$$rootFlag) {
			parent = parent.data('parent');
		}
		return parent;
	}

	/**
	 * 销毁组件
	 */
	destroy() {
		// this.unbind();
		// this.remove();
	}
}

export { Widget };
