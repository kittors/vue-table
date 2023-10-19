import { SheetUtils } from '../utils/sheetUtils';

class Element {
	/**
	 * Element
	 * @param tag //节点类型 /
	 * @param className //class选择器名称
	 */
	constructor(tag, className = '') {
		if (typeof tag === 'string') {
			this.el = document.createElement(tag);
			if (className) {
				this.el.className = className;
			}
		} else {
			this.el = tag; //如果不是dom节点
		}
		this.map = {};
	}

	/**
	 * 包装元素
	 */
	static wrapElement(object) {
		if (
			[
				SheetUtils.isArray(object),
				object instanceof HTMLCollection,
				object instanceof NodeList,
			].includes(true)
		) {
			let elements = [];
			for (let i = 0; i < object.length; i++) {
				const item = object[i];
				if (item instanceof Element) {
					elements.push(item);
				} else {
					elements.push(new Element(item));
				}
			}
			return elements;
		}
		return new Element(object);
	}

	/**
	 * 空参数时返回子节点,
	 * 有参数时插入子节点
	 * @param args
	 * @returns {*[]|Element}
	 */
	childrenNodes(...args) {
		if (arguments.length === 0) {
			return Element.wrapElement(this.el.childNodes);
		}
		args.forEach(ele => this.append(ele));
		return this;
	}

	/**
	 * 在当前元素中插入指定节点
	 * @param ele
	 */
	append(ele) {
		if (!this.isTextNode()) {
			if (ele && ele.el) {
				this.el.append(ele.el);
			}
		}
		return this;
	}

	/**
	 * 节点名称
	 * @returns {string}
	 */
	tagName() {
		console.log(this.el);
		return this.el.nodeName.toLocaleLowerCase();
	}

	/**
	 * 是否文本节点
	 * @returns {boolean}
	 */
	isTextNode() {
		return this.tagName() === '#text';
	}
}
const h = (tag, className = '') => new Element(tag, className);
export { Element, h };
