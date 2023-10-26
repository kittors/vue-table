//执行表格的绘制，并且设置必要的配置

import { DrawTable } from '../../draw/DrawTable';

class TableDrawStyle {
	constructor(canvas) {
		new DrawTable(canvas);
	}
}

export { TableDrawStyle };
