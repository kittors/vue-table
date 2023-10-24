import { inWorker } from '../utils/sheetUtils';
let DPR = inWorker() ? 1 : devicePixelRatio;
let LINE_WIDTH_LOW = Math.round(DPR);
let LINE_WIDTH_MEDIUM = LINE_WIDTH_LOW + 2;
let LINE_WIDTH_HIGH = LINE_WIDTH_MEDIUM + 2;
let LINE_PIXEL_OFFSET = LINE_WIDTH_LOW / 2;

class Base {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
	}
}

class Wrapping extends Base {}

class Extends extends Wrapping {}

class Position extends Extends {}

class BaseLine extends Position {}

class CorsLine extends BaseLine {
	constructor(canvas) {
		super(canvas);
		this.lineWidthType = CorsLine.LINE_WIDTH_TYPE.low;
		this.lineColor = 'rgb(0,0,0)';
	}
}

CorsLine.LINE_WIDTH_TYPE = {
	low: 'low',
	medium: 'medium',
	high: 'high',
};

class YDraw extends CorsLine {}

export { YDraw };
