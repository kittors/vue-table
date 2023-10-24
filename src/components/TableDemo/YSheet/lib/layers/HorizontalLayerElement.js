import { cssPrefix } from '../../constant';
import { Layer } from '../layer';
import { copy } from '../../utils/sheetUtils';
class HorizontalLayerElement extends Layer {
	constructor(options) {
		super(`${cssPrefix}-horizontal-layer-element`);
		this.options = copy(
			{
				style: {
					flexGrow: '0',
				},
			},
			options
		);
		//设置元素属性
		this.css(this.options.style);
	}
}

export { HorizontalLayerElement };
