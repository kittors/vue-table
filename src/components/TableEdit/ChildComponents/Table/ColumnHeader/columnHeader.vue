<template>
	<canvas
		ref="topCanvas"
		:class="`${cssPrefix}-table-column-header`"
		:width="tableConfig.canvasView.canvasWidth * ratio"
		:height="tableConfig.index.height * ratio"
		:style="{
			height: tableConfig.index.height + 'px',
			width: tableConfig.canvasView.canvasWidth + 'px',
		}"
	></canvas>
</template>

<script setup lang="ts">
import { cssPrefix } from '../../../const/Constant';
import { onMounted, ref, nextTick } from 'vue';
import { TableConfig } from '../TableView/type';
import { handlerPointRect } from '../../../utils/sheetUtils';
const props = defineProps(['tableConfig', 'ratio']);
const tableConfig: TableConfig = props.tableConfig as TableConfig;
const ratio = props.ratio;
const colsData = tableConfig.cols.data;
const topCanvas = ref<HTMLCanvasElement | null>(null);
const headCells = ref<{ x: number; y: number; width: number }[]>([]);
const height: number = tableConfig.index.height;
const handlerDrawHead = async (): Promise<void> => {
	if (topCanvas.value) {
		const canvasElement = topCanvas.value as HTMLCanvasElement;
		let ctx: CanvasRenderingContext2D = canvasElement.getContext(
			'2d'
		) as CanvasRenderingContext2D;
		colsData.forEach((item, index) => {
			let cell = {
				x: (index * item.width) as number,
				y: 0,
				width: item.width,
				txt: item.flag,
			};
			headCells.value.push(cell);
		});
		await nextTick(() => {
			ctx.lineWidth = 1 * ratio;
			ctx.strokeStyle = '#cecece';
			ctx.font = `normal ${12 * ratio}px PingFang SC`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			headCells.value.forEach(i => {
				let { x, y, width, txt } = i as {
					x: number;
					y: number;
					width: number;
					txt: string;
				};
				handlerPointRect(ctx, x, y, width, height, txt, '#fafafa', 'rgb(38, 38, 38)');
			});
		});
	}
};

const init = () => {
	//画列标题
	handlerDrawHead();
};

onMounted(() => {
	init();
});
</script>

<style scoped lang="less"></style>
