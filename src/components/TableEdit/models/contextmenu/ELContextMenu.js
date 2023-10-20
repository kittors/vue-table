import { Widget } from '../../lib/Widget';
import { cssPrefix } from '../../const/Constant';
import { SheetUtils } from '../../utils/sheetUtils';
import { ElPopUp } from '../elpopup/ElPopUp';

class ELContextMenu extends Widget {
	constructor(className = '', options = {}) {
		super(`${cssPrefix}-el-context-menu ${className}`);
		this.options = SheetUtils.copy(
			{
				root: h(document.body),
			},
			options
		);
		this.menus = [];
		this.elPopUp = new ElPopUp(this.options).parentWidget(this);
		this.elPopUp.childrenNodes(this);
	}
}
export { ELContextMenu };
