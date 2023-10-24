import { Widget } from '../../lib/Widget';
import { cssPrefix } from '../../constant';
import { copy } from '../../utils/sheetUtils';
import { YWorkSheetView } from './sheet/YWorkSheetView';
import { HorizontalLayerElement } from '../../lib/layers/HorizontalLayerElement';

const settings = {
	banner: true, //默认开启水印
	hideTabs: false, //隐藏Tabs
};

class YWorkBody extends Widget {
	/**
	 *
	 * @param {*} work
	 * @param {*} options
	 */
	constructor(work, options) {
		super(`${cssPrefix}-work-body`);
		this.options = copy(
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

		//组件
		this.sheetView = new YWorkSheetView({
			...this.options.sheetConfig,
		});

		// sheet表 设置sheet表格样式
		this.sheetViewLayer = new HorizontalLayerElement({
			style: {
				flexGrow: 1,
			},
		});
	}
    onAttach(){
        console.log('YWorkBody')
    }
}

export { YWorkBody };
