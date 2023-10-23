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
		}
		this.map = {};
	}
}

export { Element };
