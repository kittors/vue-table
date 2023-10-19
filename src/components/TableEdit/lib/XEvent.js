import { Constant } from '../const/Constant';
import { Element } from './Element';

class BindPool {
	constructor() {
		this.pool = [];
	}
	//解绑事件监听器
	unbind(ele, type, callback, option) {
		if (ele instanceof Element) {
			ele = ele.el;
		}
		const result = this.remove(ele, type, callback, option);
		if (result.length) {
			result.forEach(item => {
				ele.removeEventListener(item.type, item.callback, item.option);
			});
		} else {
			ele.removeEventListener(type, callback, option);
		}
	}
	//绑定事件监听器
	bind(ele, type, callback, option) {
		if (ele instanceof Element) {
			ele = ele.el;
		}
		this.pool.push({
			ele,
			type,
			callback,
			option,
		});
		ele.addEventListener(type, callback, option);
	}
}

const pool = new BindPool();

class XEvent {
	//解绑事件监听
	static unbind(target, name = null, fn = null, option = false) {
		if (Array.isArray(target)) {
			pool.multipleUnbind(target, name, fn, option);
		} else {
			pool.unbind(target, name, fn, option);
		}
		return target;
	}

	//绑定事件监听
	static bind(target, name, fn, option = false) {
		if (Array.isArray(target)) {
			pool.multipleBind(target, name, fn, option);
		} else {
			pool.bind(target, name, fn, option);
		}
		return target;
	}

	//处理鼠标长按事件
	static mouseHold(target, holdFunc = () => {}, endFunc = () => {}, time = 150) {
		let handle = setInterval(() => {
			holdFunc();
		}, time);
		let xEvtUp = evt => {
			clearInterval(handle);
			XEvent.unbind(target, Constant.SYSTEM_EVENT_TYPE.MOUSE_UP, xEvtUp, true);
			endFunc(evt);
		};
		holdFunc();
		XEvent.bind(target, Constant.SYSTEM_EVENT_TYPE.MOUSE_UP, xEvtUp, true);
	}

	//处理鼠标移动和松开事件
	static mouseMoveUp(target, moveFunc = () => {}, upFunc = () => {}) {
		const xEvtMove = evt => {
			moveFunc(evt);
			evt.stopPropagation(); //阻止当前事件的传播
			evt.preventDefault(); //防止事件的默认行为发生 例如，如果事件是点击链接，调用 preventDefault 将阻止链接导航到指定的 URL。
		};
		const xEvtUp = evt => {
			XEvent.unbind(target, Constant.SYSTEM_EVENT_TYPE.MOUSE_MOVE, xEvtMove, true);
			XEvent.unbind(target, Constant.SYSTEM_EVENT_TYPE.MOUSE_UP, xEvtUp, true);
			upFunc(evt);
			evt.preventDefault(); //防止事件的默认行为发生
		};
		XEvent.bind(target, Constant.SYSTEM_EVENT_TYPE.MOUSE_MOVE, xEvtMove, true);
		XEvent.bind(target, Constant.SYSTEM_EVENT_TYPE.MOUSE_UP, xEvtUp, true);
		return target;
	}
}

export { XEvent };
