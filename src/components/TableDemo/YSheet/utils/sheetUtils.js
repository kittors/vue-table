const DATA_TYPE = {
	String: 1,
	Boolean: 2,
	Number: 3,
	Object: 4,
	Array: 5,
	Function: 6,
	Null: 7,
	Undefined: 8,
	Promise: 9,
	GeneratorFunction: 10,
	AsyncFunction: 11,
	BigInt: 12,
	Symbol: 13,
	DedicatedWorkerGlobalScope: 14,
	Date: 15,
	RegExp: 16,
	Un: 0,
};

const isArray = e => {
	return type(e) === DATA_TYPE.Array;
};
/**
 *
 * @param {*} arg
 * @returns
 */
const type = arg => {
	const type = Object.prototype.toString.call(arg);
	switch (type) {
		case '[object Null]':
			return DATA_TYPE.Null;
		case '[object Object]':
			return DATA_TYPE.Object;
		case '[object Undefined]':
			return DATA_TYPE.Undefined;
		case '[object String]':
			return DATA_TYPE.String;
		case '[object Boolean]':
			return DATA_TYPE.Boolean;
		case '[object Number]':
			return DATA_TYPE.Number;
		case '[object Function]':
			return DATA_TYPE.Function;
		case '[object Array]':
			return DATA_TYPE.Array;
		case '[object Promise]':
			return DATA_TYPE.Promise;
		case '[object GeneratorFunction]':
			return DATA_TYPE.GeneratorFunction;
		case '[object AsyncFunction]':
			return DATA_TYPE.AsyncFunction;
		case '[object BigInt]':
			return DATA_TYPE.BigInt;
		case '[object Symbol]':
			return DATA_TYPE.Symbol;
		case '[object Date]':
			return DATA_TYPE.Date;
		case '[object DedicatedWorkerGlobalScope]':
			return DATA_TYPE.DedicatedWorkerGlobalScope;
		default:
			return DATA_TYPE.Un;
	}
};

/**
 *
 * @returns boolean
 */
const inWorker = () => {
	// eslint-disable-next-line no-restricted-globals
	const _type = type(self);
	return _type === DATA_TYPE.DedicatedWorkerGlobalScope;
};

/**
 *
 * @param {*} obj
 * @returns
 */
const isString = obj => {
	return type(obj) === DATA_TYPE.String;
};

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

export { copy, isUnDef, isPlainObject, isString, inWorker, isArray };
