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
import { inWorker } from '@/components/TableEdit/utils/sheetUtils';
import { onMounted, ref, nextTick } from 'vue';
import { cssPrefix } from '../../../const/Constant';
import { useTableEditStore } from '@/store';
import { CanvasViewType } from './type';
const canvasRef = ref<HTMLElement | null>(null);
const canvasView = ref<CanvasViewType>({
	canvasWidth: 0,
	canvasHeight: 0,
	ctx: null,
});
//设备的物理像素与逻辑像素之间的比率
let dpr: number = inWorker() ? 1 : devicePixelRatio;

const state = useTableEditStore().$state;
let ratioNum = ref<number>(dpr);
state.ratio = ratioNum.value;

//单元格宽度
const cellWidth = ref<number>(100);

//单元格高度
const cellHeight = ref<number>(25);

//列数
const colnum = ref<number>(20);

//行数
const rownum = ref<number>(100);

//表格数据 any是单元格数据
const centerCells = ref<Array<any>>([]);

const centerCanvas: CanvasViewType = canvasView.value;
const cellW: number = cellWidth.value;
const cellH: number = cellHeight.value;
const cols: number = colnum.value;
const rows: number = rownum.value;
const ratio: number = state.ratio;

//初始化
const init = (): void => {
	handlerDrawCenter();
};

//绘制表格显示区域
const handlerDrawCenter = (): void => {
	console.log(canvasRef.value);
	if (canvasRef.value) {
		let canvasElement = canvasRef.value as HTMLCanvasElement;
		let ctx: CanvasRenderingContext2D | null = canvasElement.getContext('2d');
		centerCanvas.ctx = ctx;
		centerCanvas.canvasHeight = cellH * rows + 1;
		centerCanvas.canvasWidth = cellW * cols + cellW / 2;
		//这边生成二位数组的性能还需要优化
		for (let i = 0; i < rows; i++) {
			let line = [];
			for (let j = 0; j < cols; j++) {
				let cell = {
					x: j * cellW,
					y: i * cellH,
					width: cellW,
					height: cellH,
					txt: `${i + 1}行${j + 1}列`,
				};
				line.push(cell);
			}
			centerCells.value.push(line);
		}

		console.log(centerCells.value);

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
		centerCells.value.forEach(z => {
			z.forEach((i: { x: number; y: number; width: number; height: number; txt: string }) => {
				let { x, y, width, height, txt } = i;
				handlerPointRect(ctx, x, y, width, height, txt, null, 'rgb(38, 38, 38)');
			});
		});
	});
};

//绘制完整单元格
const handlerPointRect = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	txt: string,
	bgc: string | null,
	color: string
): void => {
	ctx.fillStyle = bgc ? bgc : '#fff';
	ctx.beginPath();

	const startPoint = handlerLineAddFixed(x, y);
	ctx.moveTo(startPoint[0], startPoint[1]);

	const endPoint1 = handlerLineAddFixed(x + width, y);
	ctx.lineTo(endPoint1[0], endPoint1[1]);

	const endPoint2 = handlerLineAddFixed(x + width, y + height);
	ctx.lineTo(endPoint2[0], endPoint2[1]);

	const endPoint3 = handlerLineAddFixed(x, y + height);
	ctx.lineTo(endPoint3[0], endPoint3[1]);

	ctx.lineTo(startPoint[0], startPoint[1]);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = color ? color : '#000';
	if (txt.toString().length > 0) {
		const textPosition = handlerPointAddFixed(x + width / 2, y + height / 2);
		ctx.fillText(txt, textPosition[0], textPosition[1]);
	}
};

//用于适配不同设备的分辨率
const handlerLineAddFixed = (x: number, y: number): number[] => {
	return [(x + 0.5) * ratio, (y + 0.5) * ratio];
};

const handlerPointAddFixed = (x: number, y: number): number[] => {
	return [x * ratio, y * ratio];
};

onMounted((): void => {
	console.log(canvasRef.value);
	console.log(ratioNum.value);
	init();
});
</script>

<style scoped lang="less"></style>
