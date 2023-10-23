/**
 *
 * @param {*} object
 * @param  {...any} sources
 * 将sources的变化属性全部copy到object中
 */
const copy = (object = {}, ...sources) => {
	if (isUnDef(object)) {
		return {};
	}
	if (isUnDef(sources) || sources.length === 0) {
		return object;
	}
	sources.forEach(source => {
		if (isUnDef(source)) return;
		Object.keys(source).forEach(key => {
			const v = source[key];
			if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
				object[key] = v;
			} else if (typeof v !== 'function' && !Array.isArray(v) && isPlainObject(v)) {
				object[key] = object[key] || {};
				copy(object[key], v);
			} else if (v) {
				object[key] = v;
			}
		});
	});
	return object;
};

/**
 *
 * @param {*} e
 * @returns boolean
 */
const isUnDef = e => {
	return e === undefined || e === null;
};

/**
 *
 * @param {*} obj  是否是普通对象
 * @returns boolean
 */
const isPlainObject = obj => {
	if (isUnDef(obj)) {
		return false;
	}
	return Object.getPrototypeOf(obj) === Object.getPrototypeOf({});
};

export { copy, isUnDef, isPlainObject };
