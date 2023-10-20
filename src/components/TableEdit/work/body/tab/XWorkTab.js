import { Widget } from '../../../lib/Widget';
import { cssPrefix } from '../../../const/Constant';
import { XEvent } from '../../../lib/XEvent';
import { Constant } from '../../../const/Constant';
class XWorkTab extends Widget {
	/**
	 *
	 * @param {*} name
	 * @param {*} param1
	 */
	constructor(name, { lClickHandle = () => {}, rClickHandle = () => {} }) {
		super(`${cssPrefix}-sheet-tab`);
		this.name = name;
		this.editor = new Widget(`${cssPrefix}-sheet-tab-editor`, 'span');
		this.lClickHandle = lClickHandle; //左键
		this.rClickHandle = rClickHandle; //右键
		this.attach(this.editor);
		this.bind();
	}
	bind() {
		XEvent.bind(this, Constant.SYSTEM_EVENT_TYPE.MOUSE_DOWN, event => {
			if (event.button === 0) {
				this.lClickHandle(event);
			}
		});
		XEvent.bind(this, Constant.SYSTEM_EVENT_TYPE.CONTEXT_MENU, event => {
			this.rClickHandle(event);
		});
	}
}

export { XWorkTab };
