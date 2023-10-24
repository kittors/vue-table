import { isArray } from '../utils/sheetUtils';
class Element {
	/**
	 *
	 * @param {*} tag
	 * @param {*} className
	 */
	constructor(tag, className = '') {
		if (typeof tag === 'string') {
			this.el = document.createElement(tag);
			if (className) {
				this.el.className = className;
			}
		} else {
			this.el = tag;
		}
		this.map = {};
	}

	/**
	 * 包装元素
	 */
	static wrapElement(object) {
		if (
			[
				isArray(object),
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
	 * 数据绑定
	 * @param key
	 * @param value
	 * @returns {Element|*}
	 */
	data(key, value) {
		if (value !== undefined) {
			this.map[key] = value;
			return this;
		}
		return this.map[key];
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
	 * 节点名称
	 * @returns {string}
	 */
	tagName() {
		return this.el.nodeName.toLocaleLowerCase();
	}
	/**
	 * 是否文本节点
	 * @returns {boolean}
	 */
	isTextNode() {
		return this.tagName() === '#text';
	}

	/**
	 * 驼峰转连字符
	 * @param value
	 * @returns {string|null}
	 */
	static hyphenateRE(value) {
		if (value) {
			return value.replace(/([A-Z])/g, '-$1').toLowerCase();
		}
		return null;
	}
	/**
	 * 设置元素属性
	 * @param {*} name
	 * @param {*} value
	 * @returns {string|null|Element}
	 */
	css(name, value = undefined) {
		if (!this.isTextNode()) {
			if (this.el.style) {
				if (value === undefined && typeof name !== 'string') {
					Object.keys(name).forEach(key => {
						const property = Element.hyphenateRE(key);
						this.el.style.setProperty(property, name[key]);
					});
					return this;
				}
				if (value !== undefined) {
					const property = Element.hyphenateRE(name);
					this.el.style.setProperty(property, value);
					return this;
				}
				const property = Element.hyphenateRE(name);
				return this.el.style.getPropertyValue(property);
			}
		}
		return null;
	}
}
const h = (tag, className = '') => new Element(tag, className);
export { Element, h };
