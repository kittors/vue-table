// models/tableEdit.ts
import { defineStore } from 'pinia';

// 定义状态类型
export interface TableEditState {
	ratio: number;
}

export const useTableEditStore = defineStore('tableEdit', {
	state: (): TableEditState => ({
		ratio: 1,
	}),
	actions: {
		// 定义 actions
	},
	getters: {
		// 定义 getters
	},
});
