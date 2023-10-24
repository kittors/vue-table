import { Widget } from '../lib/Widget';
import { cssPrefix } from '../constant';
import { copy } from '../utils/sheetUtils';
import { YWorkBody } from './body/YWorkBody';

//workconfig默认配置
const settings = {
	top: {
		option: {
			show: true,
		},
		menu: {
			show: true,
		},
	},
	body: {
		sheets: [
			{
				tableConfig: {},
			},
		],
		tabConfig: {},
		sheetConfig: {},
	},
	bottom: {
		show: true,
	},
};

class YWork extends Widget {
	constructor(options) {
		super(`${cssPrefix}-work`);
		this.options = copy({}, settings, options);
		//组件
		this.body = new YWorkBody(this, this.options.body);
	}
	onAttach() {
		console.log(2)
	}
}

export { YWork };
