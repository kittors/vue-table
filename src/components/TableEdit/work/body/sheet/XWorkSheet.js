import { cssPrefix } from '../../../const/Constant';
import { Widget } from '../../../lib/Widget';
import { XTableDimension } from '../../../core/table/XTableDimension';
class XWorkSheet extends Widget {
	/**
	 *
	 * @param {*} tab
	 * @param {*} options
	 */
	constructor(tab, options) {
		super(`${cssPrefix}-sheet`);
		this.tab = tab;
		this.options = SheetUtils.copy(
			{},
			settings,
			{
				tableConfig: {
					data: [],
				},
			},
			options
		);
		this.table = new XTableDimension(this.options.tableConfig);
	}
	onAttach() {
		const { table } = this;
        //追加table节点
		this.attach(table);
	}
}
export { XWorkSheet };
