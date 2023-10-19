import { Widget } from '../lib/Widget';
import { SheetUtils } from '../utils/sheetUtils';

const settings = {
	created: new Date(),
	modified: new Date(),
	creator: '', //修改者
	lastModifiedBy: '', //最后修改时间
};
class XWork extends Widget {
	constructor(options) {
		super(`${cssPrefix}-work`);
		this.options = SheetUtils.copy({}, settings, options);
	}
}

export { XWork };
