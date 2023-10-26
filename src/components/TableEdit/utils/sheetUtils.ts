const alphabets = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

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

export const inWorker = (): boolean => {
	const _type = type(self);
	return _type === DATA_TYPE.DedicatedWorkerGlobalScope;
};

export const type = (arg: Window): number => {
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
