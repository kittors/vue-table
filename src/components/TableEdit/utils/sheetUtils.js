/* global navigator document window self */
//对不同数据类型进行映射
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

class SheetUtils {
	//是否Windows系统
	static isWindows() {
		return /windows|win32/i.test(navigator.userAgent);
	}

	//是否Mac系统
	static isMac() {
		return /macintosh|mac os x/i.test(navigator.userAgent);
	}

	//非空对象
	static isNotEmptyObject(object) {
		return !SheetUtils.isEmptyObject(object);
	}

	//是空对象
	static isEmptyObject(object) {
		// eslint-disable-next-line no-restricted-syntax
		for (const key in object) {
			// eslint-disable-next-line no-prototype-builtins
			if (object.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}

	//是undefined 或者null
	static isUnDef(e) {
		return e === undefined || e === null;
	}

	//非undefined和null
	static isDef(e) {
		return !this.isUnDef(e);
	}

	//是否是数字
	static isNumber(e) {
		return /^(-?\d+.\d+)$|^(-?\d+)$/.test(e);
	}

	//是否是字符串
	static isString(obj) {
		return SheetUtils.type(obj) === DATA_TYPE.String;
	}

	//用于判断参数的数据类型，给出其对应的数据类型映射
	static type(arg) {
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
	}
	//是否在Web Worker 线程全局环境中
	static inWorker() {
		// eslint-disable-next-line no-restricted-globals
		const type = SheetUtils.type(self);
		return type === DATA_TYPE.DedicatedWorkerGlobalScope;
	}
}

export { SheetUtils };
