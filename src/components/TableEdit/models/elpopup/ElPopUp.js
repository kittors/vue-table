import { Widget } from '../../lib/Widget';
import { XEvent } from '../../lib/XEvent';
import { Constant } from '../../const/Constant';

class ElPopUp extends Widget {
	constructor(options) {
		super(`${cssPrefix}-el-pop-up`);
		instances.push(this);
		this.options = SheetUtils.copy(
			{
				el: SheetUtils.Nul,
				autoWidth: false,
				autoHeight: false,
				position: ElPopUp.POPUP_POSTION.B,
			},
			options
		);
		this.status = false;
		this.elPopUpDownHandle = () => {
			this.close();
		};
		this.bind();
	}
	/**
	 * 关闭弹框
	 */
	close() {
		const root = this.getRootWidget();
		if (this.status === true && root) {
			this.status = false;
			root.remove(this);
		}
	}

	/**
	 * 绑定事件
	 */
	bind() {
		XEvent.bind(this, Constant.SYSTEM_EVENT_TYPE.MOUSE_DOWN, e => {
			e.stopPropagation();
		});
		XEvent.bind(document, Constant.SYSTEM_EVENT_TYPE.MOUSE_DOWN, this.elPopUpDownHandle);
	}

	/**
	 * 卸载绑定事件
	 */
	unbind() {
		XEvent.unbind(this);
		XEvent.unbind(document, Constant.SYSTEM_EVENT_TYPE.MOUSE_DOWN, this.elPopUpDownHandle);
	}

	/**
	 * 鼠标定位
	 */
	pointPos() {
		// 当前根元素的尺寸和位置
		const viewport = this.getRootBox();
		// 当前面板的尺寸和位置
		const location = this.relativeBox();
		// 定位的方式(上,下,左,右)
		const position = this.getPos();
		// 相对定位元素的尺寸和位置
		const relative = this.getTarget().relativeBox();
		// 判断定位方式
		switch (position) {
			case ElPopUp.POPUP_POSTION.L: {
				// 左边可视区域是否容纳的下
				const tOffset = relative.left - location.width;
				if (tOffset > 0) {
					this.offset({
						left: tOffset,
						top: relative.top,
					});
					return;
				}
				// 右边可视区域是否容纳的下
				const rOffset = relative.left + relative.width;
				const boundary = rOffset + location.width;
				if (boundary < viewport.width) {
					this.offset({
						left: rOffset,
						top: relative.top,
					});
					return;
				}
				// 左右都放不下默认放到左边收缩容器宽度
				this.offset({
					left: tOffset,
					top: relative.top,
				});
				break;
			}
			case ElPopUp.POPUP_POSTION.T: {
				// 上边可视区域是否容纳的下
				const tOffset = relative.top - location.height;
				if (tOffset > 0) {
					this.offset({
						left: relative.left,
						top: tOffset,
					});
					return;
				}
				// 右边可视区域是否容纳的下
				const bOffset = relative.top + relative.height;
				const boundary = bOffset + location.height;
				if (boundary < viewport.height) {
					this.offset({
						top: bOffset,
						left: relative.left,
					});
					return;
				}
				// 上下都放不下默认放到上边收缩容器宽度
				this.offset({
					left: relative.left,
					top: tOffset,
				});
				break;
			}
			case ElPopUp.POPUP_POSTION.R: {
				// 右边可视区域是否容纳的下
				const rOffset = relative.left + relative.width;
				const boundary = rOffset + location.width;
				if (boundary < viewport.width) {
					this.offset({
						left: rOffset,
						top: relative.top,
					});
					return;
				}
				// 左对齐时坐标的偏移位置
				const tOffset = relative.left - location.width;
				if (tOffset > 0) {
					this.offset({
						left: tOffset,
						top: relative.top,
					});
					return;
				}
				// 左右都放不下默认放到右边收缩容器宽度
				this.offset({
					left: rOffset,
					top: relative.top,
				});
				break;
			}
			case ElPopUp.POPUP_POSTION.B: {
				// 右边可视区域是否容纳的下
				const bOffset = relative.top + relative.height;
				const boundary = bOffset + location.height;
				if (boundary < viewport.height) {
					this.offset({
						top: bOffset,
						left: relative.left,
					});
					return;
				}
				// 上边可视区域是否容纳的下
				const tOffset = relative.top - location.height;
				if (tOffset > 0) {
					this.offset({
						left: relative.left,
						top: tOffset,
					});
					return;
				}
				// 上下都放不下默认放到下边收缩容器宽度
				this.offset({
					top: bOffset,
					left: relative.left,
				});
				break;
			}
		}
	}
}

ElPopUp.POPUP_POSTION = {
	B: Symbol('下'),
	T: Symbol('上'),
	L: Symbol('左'),
	R: Symbol('右'),
};

export { ElPopUp };
