<template>
	<canvas
		ref="canvasRef"
		:class="`${cssPrefix}-table-canvas`"
		:width="canvasView.canvasWidth * ratio"
		:height="canvasView.canvasHeight * ratio"
		:style="{
			width: canvasView.canvasWidth + 'px',
			height: canvasView.canvasHeight + 'px',
		}"
	></canvas>
</template>

<script setup lang="ts">
import {
	inWorker,
	generateColConfigArray,
	generateRowConfigArray,
	sumPropertyValues,
	handlerPointRect,
} from '@/components/TableEdit/utils/sheetUtils';
import { onMounted, ref, nextTick, defineProps } from 'vue';
import { cssPrefix } from '../../../const/Constant';
import { CanvasViewType } from './type';

//props
const props = defineProps(['tableConfig', 'ratio']);
const tableConfig = props.tableConfig;
const ratio = props.ratio;

const canvasRef = ref<HTMLElement | null>(null);
const canvasView = ref<CanvasViewType>({
	canvasWidth: 0,
	canvasHeight: 0,
	ctx: null,
});

//表格数据 any是单元格数据 暂时写any 没想好数据结构啥样的
const centerCells = ref<Array<any>>([]);
const centerCanvas: CanvasViewType = canvasView.value;
const rows = tableConfig.rows.len;
const cols = tableConfig.cols.len;
const cellW = tableConfig.cols.width;
const cellH = tableConfig.rows.height;

//初始化
const init = (): void => {
	handlerDrawCenter();
};

//绘制表格显示区域
const handlerDrawCenter = (): void => {
	if (canvasRef.value) {
		let canvasElement = canvasRef.value as HTMLCanvasElement;
		let ctx: CanvasRenderingContext2D | null = canvasElement.getContext('2d');
		centerCanvas.ctx = ctx;
		centerCanvas.canvasHeight = tableConfig.canvasView.canvasHeight + 1;
		centerCanvas.canvasWidth = tableConfig.canvasView.canvasWidth + 20;
		tableConfig.canvasView.ctx = ctx;
		//这边生成二位数组的性能还需要优化
		for (let i = 0; i < rows; i++) {
			let line = [];
			for (let j = 0; j < cols; j++) {
				let cell = {
					x: j * cellW,
					y: i * cellH,
					txt: `${i + 1}行${j + 1}列`,
				};
				line.push(cell);
			}
			centerCells.value.push(line);
		}
		//开始执行绘制
		if (ctx) {
			startDrawCenterView(ctx, ratio);
		}
	}
};

//开始绘制
const startDrawCenterView = async (ctx: CanvasRenderingContext2D, ratio: number): Promise<void> => {
	//刷新DOM
	await nextTick(() => {
		ctx.lineWidth = 1 * ratio;
		ctx.strokeStyle = '#cecece';
		ctx.font = `normal ${12 * ratio}px PingFang SC`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		const rowsData = tableConfig.rows.data; //行数据
		const colsData = tableConfig.cols.data; //列数据
		centerCells.value.forEach((z, rowIndex) => {
			z.forEach((i: { x: number; y: number; txt: string }, colIndex: number) => {
				let { x, y, txt } = i;
				handlerPointRect(
					ctx,
					x,
					y,
					colsData[colIndex].width,
					rowsData[rowIndex].height,
					txt,
					null,
					'rgb(38, 38, 38)'
				);
			});
		});
	});
};

onMounted((): void => {
	init();
});
</script>

<style scoped lang="less"></style>
