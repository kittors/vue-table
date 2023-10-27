// models/tableEdit.ts
import { defineStore } from 'pinia';
import { Options, TableConfig } from '@/components/TableEdit/sheetDateType';

// 定义状态类型
export interface TableEditState {
	ratio: number;
	options: Object;
	sheertIndex: number;
	tableConfig: Object;
}

export const useTableEditStore = defineStore('tableEdit', {
	state: (): TableEditState => ({
		ratio: 1,
		options: {},
		tableConfig: {},
		sheertIndex: 0,
	}),
	actions: {
		//设置sheet序号
		setSheetIndex(val: number) {
			this.sheertIndex = val;
		},
		//设置options
		setOptions(obj: Options) {
			this.options = obj;
		},
		//设置表格设置
		setTableConfig(obj: TableConfig) {
			this.tableConfig = obj;
		},
	},
	getters: {
		// 定义 getters
	},
});
