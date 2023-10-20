import { Widget } from '../../lib/Widget';
import { XWorkSheet } from './sheet/XWorkSheet';
import { XWorkTab } from './tab/XWorkTab';
import { XWorkSheetView } from './sheet/XWorkSheetView';
import { XWorkTabView } from './tab/XWorkTabView';

class XWorkBody extends Widget {
	/**
	 *
	 * @param {*} work
	 * @param {*} options
	 */
	constructor(work, options) {
		super(`${cssPrefix}-work-body`);
		this.options = SheetUtils.copy(
			{},
			settings,
			{
				tabConfig: {
					showAdd: true,
				},
				sheets: [],
				sheetConfig: {},
			},
			options
		);
		this.work = work;
		this.sheets = this.options.sheets;
		// 组件
        //添加sheet view
		this.sheetView = new XWorkSheetView({
			...this.options.sheetConfig,
		});
        //添加 tab view
		this.tabView = new XWorkTabView({
			...this.options.tabConfig,
            //切换sheet tab
			onSwitch: tab => {
				const index = this.tabView.getIndexByTab(tab);
				this.setActiveByIndex(index);
			},
            //添加sheet tab
			onAdded: () => {
				const tab = new XWorkTab();
				const sheet = new XWorkSheet(tab, {
					tableConfig: {
						data: [],
					},
				});
				this.addTabSheet(tab, sheet);
			},
            //删除sheet tab
			onRemove: tab => {
				const index = this.tabView.getIndexByTab(tab);
				new Confirm({
					message: `是否删除${tab.name}`,
					ok: () => {
						this.removeByIndex(index);
					},
				})
					.parentWidget(this)
					.open();
			},
			onSort: () => {
				this.sheetView.sortByTabs(this.tabView.getTabs());
			},
		});
	}

	/**
	 * 初始化Sheet
	 */
	initializeSheet() {
		for (const item of this.sheets) {
			const { name } = item;
			const tab = new XWorkTab(name);
			const sheet = new XWorkSheet(tab, item);
			this.addTabSheet(tab, sheet);
		}
	}
	/**
	 * 添加一个新的 tab sheet
	 * @param tab
	 * @param sheet
	 */
	addTabSheet(tab, sheet) {
		const { tabView } = this;
		const { sheetView } = this;
		const { table } = sheet;
		tabView.attach(tab);
		sheetView.attach(sheet);
		XWorkBodyKeyHandle.register({
			table,
			body: this,
		});
	}
}

export { XWorkBody };
