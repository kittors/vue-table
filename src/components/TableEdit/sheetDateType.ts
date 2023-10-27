interface TableConfig {
	index: Index;
	table: Table;
	rows: Rows;
	cols: Cols;
	canvasView: CanvasView;
}

interface CanvasView {
	canvasWidth: number;
	canvasHeight: number;
	ctx: CanvasRenderingContext2D | null;
}

interface Cols {
	len: number;
	width: number;
	data: ColsData[];
}

interface ColsData {
	width: number;
	flag: string;
}

interface Rows {
	len: number;
	height: number;
	data: RowsData[];
}
interface RowsData {
	height: number;
	flag: string;
}

interface Table {
	showGrid: boolean;
	background: string;
	borderColor: string;
	gridColor: string;
}
interface Index {
	displayTopIndex: boolean;
	displayLeftIndex: boolean;
	height: number;
	width: number;
	gridColor: string;
	size: number;
	color: string;
}

interface Sheet {
	tableConfig: TableConfig;
	name: string;
	// 其他可能的属性
}

interface Body {
	sheets: Sheet[];
	// 其他可能的属性
}

interface Top {
	option: TopOptions;
	menu: Menu;
}

interface TopOptions {
	show: boolean;
}

interface Menu {
	show: boolean;
}

interface WorkConfig {
	name: string;
	body: Body;
	top: Top;
	bottom: Bottom;
	// 其他可能的属性
}

interface Bottom {
	show: boolean;
}

interface Options {
	workconfig: WorkConfig;
	// 其他可能的属性
}

export type {
	Options,
	WorkConfig,
	Bottom,
	Top,
	Body,
	TopOptions,
	Menu,
	Sheet,
	Index,
	Table,
	RowsData,
	ColsData,
	Cols,
	Rows,
	TableConfig,
};
