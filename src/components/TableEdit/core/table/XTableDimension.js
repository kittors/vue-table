import { Widget } from '../../lib/Widget';
import { SheetUtils } from '../../utils/sheetUtils';

//设置sheet表格保护
const settings = {
	sheetProtection: false,
};
const optionsDefault = {
	index: {
		gridColor: 'rgb(193,193,193)',
		height: 30,
		width: 50,
		size: 12,
		color: 'rgb(0,0,0)',
		displayTopIndex: true,
		displayLeftIndex: true,
	},
	table: {
		showGrid: true,
		background: 'rgb(255,255,255)',
		borderColor: 'rgb(0,0,0)',
		gridColor: 'rgb(225,225,225)',
	},
	rows: {
		len: 1000,
		height: 30,
		data: [],
	},
	cols: {
		len: 36,
		width: 110,
		data: [],
	},
	data: [],
	protection: {
		protections: [],
	},
	merge: {
		merges: [],
	},
};

class XTableDimension extends Widget {
	/**
	 *
	 * @param {*} options
	 */
	constructor(options) {
		super(`${cssPrefix}-table`);
        //copy {}, settings, optionsDefault 属性到options上
		this.settings = SheetUtils.copy({}, settings, optionsDefault, options);
        console.log(this.settings)
	}
}

export { XTableDimension };
