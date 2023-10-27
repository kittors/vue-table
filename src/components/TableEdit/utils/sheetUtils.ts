import { useTableEditStore } from '@/store';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

//copy对象键值对到新的对象中
export function copy<T extends Record<string, any>>(object: T, ...sources: Array<Partial<T>>): T {
	if (object === undefined) {
		return {} as T;
	}
	if (sources === undefined || sources.length === 0) {
		return object;
	}
	sources.forEach(source => {
		if (source === undefined) return;
		Object.keys(source).forEach(key => {
			const v = source[key];
			if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
				(object as Record<string, any>)[key] = v;
			} else if (typeof v !== 'function' && !Array.isArray(v) && isPlainObject(v as object)) {
				(object as Record<string, any>)[key] = (object as Record<string, any>)[key] || {};
				copy((object as Record<string, any>)[key], v as object);
			} else if (v) {
				(object as Record<string, any>)[key] = v;
			}
		});
	});
	return object;
}

export const isUnDef = (e: object | null | undefined): boolean => {
	return e === undefined || e === null;
};

export const isPlainObject = (obj: object): boolean => {
	if (isUnDef(obj)) {
		return false;
	}
	return Object.getPrototypeOf(obj) === Object.getPrototypeOf({});
};

const generateFlag = (n: number): string => {
	let flag = '';
	while (n >= 0) {
		flag = alphabet[n % 26] + flag;
		n = Math.floor(n / 26) - 1;
	}
	return flag;
};

export const generateColConfigArray = (
	colnum: number,
	cellWidth: number
): { width: number; flag: string }[] => {
	const result = [];
	for (let i = 0; i < colnum; i++) {
		const flag = generateFlag(i);
		result.push({ width: cellWidth, flag });
	}

	return result;
};

export const generateRowConfigArray = (
	rownum: number,
	cellHeight: number
): Array<{ height: number; flag: string }> => {
	const rowConfigurations: Array<{ height: number; flag: string }> = [];
	for (let i = 0; i < rownum; i++) {
		const flag = (i + 1).toString();
		rowConfigurations.push({ height: cellHeight, flag });
	}

	return rowConfigurations;
};

export const updateConfig = <T extends Record<string, any> & { workconfig: any }>(
	object: T,
	...sources: Array<Partial<T>>
) => {
	let setting = copy(object, ...sources);
	const store = useTableEditStore();
	store.setOptions(setting);
};

export const sumPropertyValues = (
	arr: { [key: string]: number; }[],
	propertyName: string
): number => {
	let sum = 0;
	for (const item of arr) {
		if (item.hasOwnProperty(propertyName) && typeof item[propertyName] === 'number') {
			sum += item[propertyName];
		}
	}
	return sum;
};

//用于适配不同设备的分辨率
const handlerLineAddFixed = (x: number, y: number): number[] => {
	const store = useTableEditStore();
	const ratio = store.ratio;
	return [(x + 0.5) * ratio, (y + 0.5) * ratio];
};

const handlerPointAddFixed = (x: number, y: number): number[] => {
	const store = useTableEditStore();
	const ratio = store.ratio;
	return [x * ratio, y * ratio];
};

//绘制矩形  //绘制单元格
export const handlerPointRect = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	txt: string,
	bgc: string | null,
	color: string
) => {
	ctx.fillStyle = bgc ? bgc : '#fff';
	ctx.beginPath();

	const startPoint = handlerLineAddFixed(x, y);
	ctx.moveTo(startPoint[0], startPoint[1]);

	const endPoint1 = handlerLineAddFixed(x + width, y);
	ctx.lineTo(endPoint1[0], endPoint1[1]);

	const endPoint2 = handlerLineAddFixed(x + width, y + height);
	ctx.lineTo(endPoint2[0], endPoint2[1]);

	const endPoint3 = handlerLineAddFixed(x, y + height);
	ctx.lineTo(endPoint3[0], endPoint3[1]);

	ctx.lineTo(startPoint[0], startPoint[1]);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = color ? color : '#000';
	if (txt.toString().length > 0) {
		const textPosition = handlerPointAddFixed(x + width / 2, y + height / 2);
		ctx.fillText(txt, textPosition[0], textPosition[1]);
	}
};
