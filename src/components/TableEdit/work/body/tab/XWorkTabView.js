import { Widget } from '../../../lib/Widget';

const settings = {
	showMenu: true,
	showAdd: true,
	onAdd(tab) {
		return tab;
	},
	onSwitch(tab) {
		return tab;
	},
};
class XWorkTabView extends Widget {
	/**
	 *
	 * @param {*} options
	 */
	constructor(options) {
		super(`${cssPrefix}-slide-tab-container`);
		this.tabList = [];
		this.options = SheetUtils.copy(
			{
				onSwitch: () => {},
				onAdded: () => {},
				onRemove: () => {},
				onSort: () => {},
			},
			settings,
			options
		);
	}

	/**
	 * 添加一个新的tab
	 */
	attach(tab) {
		this.tabs.attach(tab);
		this.tabList.push(tab);
		tab.setRClick(event => {
			if (this.options.showMenu) {
				const { contextMenu } = this;
				const { elPopUp } = contextMenu;
				elPopUp.setEL(tab);
				ElPopUp.closeAll([elPopUp]);
				contextMenu.open();
				contextMenu.setTab(tab);
				event.stopPropagation();
				event.preventDefault();
			}
		});
		tab.setLClick(event => {
			this.setActive(tab);
			this.options.onSwitch(tab, event);
		});
		this._reloadSlideTabBar();
		this.slideTabBar.getScrollbar().scrollXMax();
	}
}

export { XWorkTabView };
