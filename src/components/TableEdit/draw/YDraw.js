import { SheetUtils } from '../utils/sheetUtils';

//物理像素与 CSS 像素之间的比率
let DPR = SheetUtils.inWorker() ? 1 : devicePixelRatio;

let LINE_WIDTH_LOW = Math.round(DPR); //线条低宽度 四舍五入取证
let LINE_WIDTH_MEDIUM = LINE_WIDTH_LOW + 2; //线条中宽度
let LINE_WIDTH_HIGH = LINE_WIDTH_MEDIUM + 2; //线条高宽度
let LINE_PIXEL_OFFSET = LINE_WIDTH_LOW / 2; //线条像素偏移量

//最基本的类
class Base {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
	}

	//屏幕像素
	static srcPx(px) {
		return px / this.dpr();
	}

	//css像素
	static cssPx(px) {
		return this.srcPx(this.stylePx(px));
	}

	//样式像素
	static stylePx(px) {
		return this.round(px * this.dpr());
	}

	//四舍五入取整
	static round(val) {
		return Math.round(val);
	}

	//向上取整
	static ceil(val) {
		return Math.ceil(val);
	}

	//去掉小数部分取整 截断取整
	static trunc(val) {
		return Math.trunc(val);
	}

	//计算弧度
	static radian(angle) {
		return -angle * (Math.PI / 180);
	}

	//为了适应不同分辨率的屏幕
	static dpr() {
		return DPR;
	}

	static refresh(val = 1) {
		DPR = SheetUtils.inWorker() ? val : devicePixelRatio;
		LINE_WIDTH_LOW = Math.round(DPR);
		LINE_WIDTH_MEDIUM = LINE_WIDTH_LOW + 2;
		LINE_WIDTH_HIGH = LINE_WIDTH_MEDIUM + 2;
		LINE_PIXEL_OFFSET = LINE_WIDTH_LOW / 2;
	}

	//设置canvas得大小
	resize(width, height) {
		const { canvas } = this;
		canvas.width = Base.stylePx(width);
		canvas.height = Base.stylePx(height);
		canvas.style.width = `${canvas.width / Base.dpr()}px`;
		canvas.style.height = `${canvas.height / Base.dpr()}px`;
		return this;
	}

	//刷新线条
	static refresh(val = 1) {
		DPR = SheetUtils.inWorker() ? val : devicePixelRatio;
		LINE_WIDTH_LOW = Math.round(DPR);
		LINE_WIDTH_MEDIUM = LINE_WIDTH_LOW + 2;
		LINE_WIDTH_HIGH = LINE_WIDTH_MEDIUM + 2;
		LINE_PIXEL_OFFSET = LINE_WIDTH_LOW / 2;
	}

	//更改canvas的上下文属性  并支持链式调用
	attr(options) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				let value = options[key];
				if (typeof value === 'string' || value instanceof String) {
					value = value.trim();
				}
				if (this.ctx[key] !== value) {
					this.ctx[key] = value;
				}
			}
		}
		return this;
	}
}

//对canvas操作
class Wrapping extends Base {
	constructor(canvas) {
		super(canvas);
		this.dash = [];
	}

	//用于开始一个新的路径 上下文开始新路径
	beginPath() {
		const { ctx } = this;
		ctx.beginPath();
		return this;
	}

	//获取给定文本在当前绘图上下文中的宽度信息  获取文本宽度
	measureText(text) {
		const { ctx } = this;
		return ctx.measureText(text);
	}

	//保存当前上下文的绘图状态
	save() {
		const { ctx } = this;
		ctx.save();
		return this;
	}

	//恢复之前保存的绘图上下文的状态
	restore() {
		const { ctx } = this;
		ctx.restore();
		return this;
	}

	//填充当前路径内容
	fill() {
		const { ctx } = this;
		ctx.fill();
		return this;
	}

	//将当前路径设置为裁剪区域
	clip() {
		const { ctx } = this;
		ctx.clip();
		return this;
	}

	//设置线条的虚线样式
	setLineDash(dash = []) {
		const { ctx } = this;
		this.dash = dash;
		ctx.setLineDash(dash);
		return this;
	}

	//对绘图上下文进行缩放操作
	scale(x, y) {
		const { ctx } = this;
		ctx.scale(x, y);
		return this;
	}

	//用于对绘图上下文进行平移操作
	translate(x, y) {
		const { ctx } = this;
		ctx.translate(x, y);
		return this;
	}

	//用于对绘图上下文进行旋转操作
	rotate(deg) {
		const { ctx } = this;
		ctx.rotate(deg);
		return this;
	}
}

class Extends extends Wrapping {
	/**
	 * 用于绘制多边形的描述
	 * @param {*} interpolation 函数参数 多边形顶点坐标
	 * @param  {...any} xys 剩余参数，表示多边形的顶点坐标
	 */
	polyStroke(interpolation = xys => xys, ...xys) {
		const { ctx } = this;
		if (xys.length > 1) {
			this.beginPath();
			const [x, y] = interpolation(xys[0]);
			ctx.moveTo(x, y);
			for (let i = 1, len = xys.length; i < len; i += 1) {
				const [x, y] = interpolation(xys[i]);
				ctx.lineTo(x, y);
			}
			ctx.stroke();
		}
	}

	/**
	 * 用于绘制多边形的填充
	 * @param {*} interpolation 函数参数 多边形顶点坐标
	 * @param  {...any} xys 剩余参数，表示多边形的顶点坐标
	 */
	polyInFill(interpolation = xys => xys, ...xys) {
		const { ctx } = this;
		if (xys.length > 1) {
			this.beginPath();
			const [x, y] = interpolation(xys[0]);
			ctx.moveTo(x, y);
			for (let i = 1, len = xys.length; i < len; i += 1) {
				const [x, y] = interpolation(xys[i]);
				ctx.lineTo(x, y);
			}
			ctx.fill();
		}
	}

	//用于在画布上绘制一个填满整个画布的矩形
	fullRect() {
		const { canvas } = this;
		const { width, height } = canvas;
		this.ctx.fillRect(0, 0, width, height);
		return this;
	}

	//进行旋转操作  重写父类的rotate方法
	rotate(angle) {
		super.rotate(Base.radian(angle));
		return this;
	}
}

//canvas位置类
class Position extends Extends {
	/**
	 *
	 * @param {*} canvas canvas对象
	 */
	constructor(canvas) {
		super(canvas);
		this.offsetX = 0;
		this.offsetY = 0;
	}

	/**
	 * 用于设置偏移量
	 * @param {*} x x轴
	 * @param {*} y y轴
	 */
	offset(x, y) {
		this.offsetX = x;
		this.offsetY = y;
	}

	//用于获取水平方向的偏移量
	getOffsetX() {
		return this.offsetX;
	}

	//用于获取垂直方向的偏移量
	getOffsetY() {
		return this.offsetY;
	}

	//以下方法弹出类型错误

	//填充文字
	fillText() {
		throw TypeError('child impl');
	}

	//填充矩形
	fillRect() {
		throw TypeError('child impl');
	}

	//矩形
	rect() {
		throw TypeError('child impl');
	}

	//画图片
	drawImage() {
		throw TypeError('child impl');
	}
}

class BaseLine extends Position {
	//用于绘制线条
	line(...xys) {
		this.polyStroke(xys => {
			const [x, y] = xys;
			return [
				this.linePx(Base.round(x + this.getOffsetX())),
				this.linePx(Base.round(y + this.getOffsetY())),
			];
		}, ...xys);
		return this;
	}

	/**
	 * 用于对线条将像素值进行处理
	 * @param {*} pixel 像素
	 * @returns 如果线条宽度是奇数，则返回像素值 pixel 减去 0.5
	 */
	linePx(pixel) {
		const { ctx } = this;
		const { lineWidth } = ctx;
		return lineWidth % 2 === 0 ? pixel : pixel - 0.5;
	}
}

//用于绘制线条
class CorsLine extends BaseLine {
	constructor(canvas) {
		super(canvas);
		this.lineWidthType = CorsLine.LINE_WIDTH_TYPE.low;
		this.lineColor = 'rgb(0,0,0)';
	}
	//用于将偏移值转换为线条内部的位置
	static offsetToLineInside(val) {
		return LINE_WIDTH_LOW > 1 ? val - LINE_PIXEL_OFFSET : val - LINE_WIDTH_LOW;
	}

	//用于根据线条宽度类型获取对应的像素值
	static getLineWidthTypePx(type) {
		switch (type) {
			case CorsLine.LINE_WIDTH_TYPE.medium:
				return LINE_WIDTH_MEDIUM;
			case CorsLine.LINE_WIDTH_TYPE.low:
				return LINE_WIDTH_LOW;
			case CorsLine.LINE_WIDTH_TYPE.high:
				return LINE_WIDTH_HIGH;
		}
		return 0;
	}

	//用于绘制带有偏移和线条样式的线条
	corsLine([sx, sy], [ex, ey]) {
		const { lineWidthType, lineColor } = this;
		let lineWidth = LINE_WIDTH_LOW;
		switch (lineWidthType) {
			case CorsLine.LINE_WIDTH_TYPE.medium:
				lineWidth = LINE_WIDTH_MEDIUM;
				break;
			case CorsLine.LINE_WIDTH_TYPE.low:
				lineWidth = LINE_WIDTH_LOW;
				break;
			case CorsLine.LINE_WIDTH_TYPE.high:
				lineWidth = LINE_WIDTH_HIGH;
				break;
		}
		this.attr({
			strokeStyle: lineColor,
			lineWidth,
		});
		this.polyStroke(
			xys => {
				const [x, y] = xys;
				return [
					Base.round(x + this.getOffsetX()) - LINE_PIXEL_OFFSET,
					Base.round(y + this.getOffsetY()) - LINE_PIXEL_OFFSET,
				];
			},
			[sx, sy],
			[ex, ey]
		);
	}

	//设置线条颜色
	setLineColor(color) {
		this.lineColor = color;
	}

	//设置线条宽度类型
	setLineWidthType(type) {
		this.lineWidthType = type;
	}

	//垂直线条
	horizonLine([sx, sy], [ex, ey]) {
		if (sy !== ey) {
			throw new TypeError('Error Horizon Line');
		}
		this.corsLine([sx, sy], [ex, ey]);
	}

	//水平线条
	verticalLine([sx, sy], [ex, ey]) {
		if (sx !== ex) {
			throw new TypeError('Error Vertical Line');
		}
		this.corsLine([sx, sy], [ex, ey]);
	}
}

//用于表示线条宽度的类型
CorsLine.LINE_WIDTH_TYPE = {
	low: 'low',
	medium: 'medium',
	high: 'high',
};

class YDraw extends CorsLine {

    //重写文字填充
	fillText(text, x, y) {
		x += this.getOffsetX();
		y += this.getOffsetY();
		this.ctx.fillText(text, YDraw.round(x), YDraw.round(y));
		return this;
	}

    //用于填充指定路径的区域
	fillPath(path) {
		this.polyInFill(xys => {
			const { x, y } = xys;
			return [Base.round(x + this.getOffsetX()), Base.round(y + this.getOffsetY())];
		}, ...path.points);
		return this;
	}

    //填充矩形
	fillRect(x, y, w, h) {
		x += this.getOffsetX();
		y += this.getOffsetY();
		this.ctx.fillRect(YDraw.round(x), YDraw.round(y), YDraw.round(w), YDraw.round(h));
		return this;
	}

    //矩形
	rect(x, y, w, h) {
		x += this.getOffsetX();
		y += this.getOffsetY();
		this.ctx.rect(YDraw.round(x), YDraw.round(y), YDraw.round(w), YDraw.round(h));
		return this;
	}

    //copy图片
	copyImage(sx, sy, sw, sh, tx, ty, tw, th) {
		const { ctx } = this;
		tx += this.getOffsetX();
		sx += this.getOffsetX();
		ty += this.getOffsetY();
		sy += this.getOffsetY();
		ctx.drawImage(
			this.canvas,
			YDraw.round(sx),
			YDraw.round(sy),
			YDraw.round(sw),
			YDraw.round(sh),
			YDraw.round(tx),
			YDraw.round(ty),
			YDraw.round(tw),
			YDraw.round(th)
		);
		return this;
	}

    //画图片
	drawImage(el, sx, sy, sw, sh, tx, ty, tw, th) {
		const { ctx } = this;
		tx += this.getOffsetX();
		ty += this.getOffsetY();
		ctx.drawImage(
			el,
			YDraw.round(sx),
			YDraw.round(sy),
			YDraw.round(sw),
			YDraw.round(sh),
			YDraw.round(tx),
			YDraw.round(ty),
			YDraw.round(tw),
			YDraw.round(th)
		);
		return this;
	}
}

export { YDraw };
