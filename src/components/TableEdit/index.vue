<template>
	<div :class="`${cssPrefix}`">
		<div :class="`${cssPrefix}-header`"></div>
		<div :class="`${cssPrefix}-main`">
			<div
				:class="`${cssPrefix}-top`"
				:style="{
					height: tableConfig.index.height + 'px',
					left: tableConfig.index.width + 'px',
					width: tableConfig.canvasView.canvasWidth + 'px',
					'border-right': '1px solid #cecece',
				}"
			>
				<ColumnHeaderVue :tableConfig="tableConfig" :ratio="ratioNum"></ColumnHeaderVue>
			</div>
			<div :class="`${cssPrefix}-left`"></div>
			<div
				:class="`${cssPrefix}-center`"
				:style="{
					top: tableConfig.index.height + 'px',
					left: tableConfig.index.width + 'px',
					width:
				}"
			>
				<TableViewVue :tableConfig="tableConfig" :ratio="ratioNum"></TableViewVue>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { cssPrefix } from './const/Constant';
import TableViewVue from './ChildComponents/Table/TableView';
import ColumnHeaderVue from './ChildComponents/Table/ColumnHeader';
import {
	copy,
	updateConfig,
	generateRowConfigArray,
	generateColConfigArray,
	sumPropertyValues,
	inWorker,
} from './utils/sheetUtils';
import { options } from './config';
import { useTableEditStore } from '@/store';
import { TableConfig, Options } from './sheetDateType';
const setting = copy(options, {
	workconfig: {
		name: '123123',
		top: {
			option: {
				show: false,
			},
		},
	},
} as Partial<typeof options>);

//更新setting数据到全局状态管理中
updateConfig(setting);
const props = defineProps({
	config: Object,
});
const store = useTableEditStore();
//切换sheet
store.setSheetIndex(0);
const tableConfig = ref<TableConfig>(setting.workconfig.body.sheets[store.sheertIndex].tableConfig);
store.setTableConfig(tableConfig.value as TableConfig);
const option = ref<Options>(setting);

//sheet列数
const colnum = tableConfig.value.cols.len;

//sheet行数
const rownum = tableConfig.value.rows.len;

//设备适配 设备的物理像素与逻辑像素之间的比率
let dpr: number = inWorker() ? 1 : (devicePixelRatio as number);
let ratioNum = ref<number>(dpr as number);
store.ratio = dpr;

//生成列配置数据
tableConfig.value.rows.data = generateRowConfigArray(rownum, tableConfig.value.rows.height);

//生成行配置数据
tableConfig.value.cols.data = generateColConfigArray(colnum, tableConfig.value.cols.width);

//centercanvas 画板配置
const colsdata = tableConfig.value.cols.data.map(item => ({ width: item.width }));
tableConfig.value.canvasView.canvasWidth = sumPropertyValues(colsdata, 'width');

const rowsdata = tableConfig.value.rows.data.map(item => ({ height: item.height }));
tableConfig.value.canvasView.canvasHeight = sumPropertyValues(rowsdata, 'height');

onMounted(() => {});
</script>

<style scoped lang="less">
.y-sheet {
	width: 100%;
	height: 100%;
	.y-sheet-main {
		position: relative;
		height: 100%;
		width: 100%;
		.y-sheet-center {
			display: inline-block;
			position: absolute;
		}
		.y-sheet-top {
			display: inline-block;
			position: absolute;
			top: 0px;
		}
		.y-sheet-left {
			position: absolute;
		}
	}
}
</style>
