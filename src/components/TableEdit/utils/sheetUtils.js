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

	//是否是非空对象
	static isNotEmptyObject(object) {
		return !SheetUtils.isEmptyObject(object);
	}

	//是否空对象
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
}

export { SheetUtils };
