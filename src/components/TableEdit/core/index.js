import { Widget } from '../lib/Widget';
import { cssPrefix } from '../const/Constant';
import { h } from '../lib/Element';
import { SheetUtils } from '../utils/sheetUtils';
import { WidgetFocusMange } from '../lib/WidgetFocusMange'

const settings = {
	workConfig: {
		name: 'y-sheet',
		top: {
			option: {
				show: true,
			},
			menu: {
				show: true,
			},
		},
		body: {
			tabConfig: {
				showMenu: true,
				showAdd: true,
			},
			banner: true,
			sheetConfig: {
				showMenu: true,
			},
			sheets: [
				{
					tableConfig: {},
				},
			],
		},
		bottom: {
			show: true,
		},
	},
};

class YSheet extends Widget {
	/**
	 * YSheet
	 * @param el
	 * @param options
	 */
	constructor(el, options) {
		super(`${cssPrefix}`, 'div', true);

		if (SheetUtils.isString(el)) {
			el = document.querySelector(el);
		}
		h(el).childrenNodes(this);

		//暂不支持xlsx等文件的导入导出

		//将options中的属性copy到settings中 settings 是默认配置
		this.options = SheetUtils.copy({}, settings, options);

		//焦点管理
		this.focusManage = new WidgetFocusMange({
			root: this,
		});
	}

	/**
	 * destroy
	 */
	destroy() {
		super.destroy();
		this.xWork.destroy();
		this.focusManage.destroy();
		this.tabNameGen.clear();
	}
}

export { YSheet };
