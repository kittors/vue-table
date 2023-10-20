import { Widget } from '../../../lib/Widget';
import { SheetUtils } from '../../../utils/sheetUtils';
const settings = {
	showMenu: true,
};
class XWorkSheetView extends Widget {
	/**
	 *
	 * @param {*} option
	 */
	constructor(option) {
		super(`${cssPrefix}-sheet-view`);
		this.options = SheetUtils.copy({}, settings, option);
	}
	/**
	 * 初始化
	 */
	onAttach() {
		this.rootWidget = this.getRootWidget();
		this.sheetList = [];
		this.activeIndex = -1;
		this.contextMenu = new SheetContextMenu({
			onUpdate: (name, type) => {
				const sheet = this.getActiveSheet();
				const { table } = sheet;
				const { xScreen } = table;
				const xSelect = xScreen.findType(XSelectItem);
				const merges = table.getTableMerges();
				const { selectRange } = xSelect;
				switch (type) {
					case 3: {
						if (selectRange) {
							const { sri, sci } = selectRange;
							const merge = merges.getFirstInclude(sri, sci);
							if (merge) {
								const { eri } = merge;
								table.insertRowAfter(eri);
							} else {
								table.insertRowAfter(sri);
							}
						}
						break;
					}
					case 4: {
						if (selectRange) {
							const { sri, sci } = selectRange;
							const merge = merges.getFirstInclude(sri, sci);
							if (merge) {
								const { eci } = merge;
								table.insertColAfter(eci);
							} else {
								table.insertColAfter(sci);
							}
						}
						break;
					}
					case 5: {
						if (selectRange) {
							const { sri, eri } = selectRange;
							const number = eri - sri + 1;
							table.removeRow(sri, number);
						}
						break;
					}
					case 6: {
						if (selectRange) {
							const { sci, eci } = selectRange;
							const number = eci - sci + 1;
							table.removeCol(sci, number);
						}
						break;
					}
				}
			},
		}).parentWidget(this);
		this.bind();
	}
	/**
	 * 添加一个新的sheet
	 */
	attach(sheet) {
		this.sheetList.push(sheet);
		super.attach(sheet);
		sheet.hide();
	}
}

export { XWorkSheetView };
