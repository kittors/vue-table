<template>
	<div id="container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import YSheet from './YSheet/index.js';
const settings = {
	workconfig: {
		name: 'y-sheet',
		//菜单栏
		menu: {
			//是否显示菜单栏
			show: true,
		},
		//全部sheet配置
		sheetConfig: {
			// 是否显示右击菜单
			showMenu: true,
		},
		sheets: [
			{
				//工作表名称
				name: 'sheet1',
				//所有的表格配置
				tableConfig: {
					//标题行列配置
					index: {
						// 是否显示标题行
						displayTopIndex: true,
						// 是否显示标题列
						displayLeftIndex: true,
						// 标题行高度
						height: 30,
						// 标题列宽度
						width: 50,
						// 标题行列边框颜色
						gridColor: 'rgb(193,193,193)',
						// 标题行列字体大小
						size: 12,
						// 标题行列字体颜色
						color: 'rgb(0,0,0)',
					},
					// 表格整体配置
					table: {
						// 是否显示网格线
						showGrid: true,
						// 表格区域背景颜色
						background: 'rgb(255,255,255)',
						// 默认边框颜色
						borderColor: 'rgb(0,0,0)',
						// 网格线颜色
						gridColor: 'rgb(225,225,225)',
					},
					// 行配置
					rows: {
						// 自定义最大行数
						len: 100,
						// 默认行高
						height: 30,
						// 行配置数据
						data: [
							{
								// 自定义行高，未设置的会取默认行高
								height: 100,
							},
						],
					},
					// 列配置
					cols: {
						// 自定义最大列数
						len: 25,
						// 默认列宽
						width: 110,
						// 行配置数据
						data: [
							{
								// 自定义列宽，未设置的会取默认列宽
								width: 200,
							},
						],
					},
					// 冻结范围
					xFixedView: {
						// 冻结列索引，-1为不冻结
						fxLeft: -1,
						// 冻结行索引，-1为不冻结
						fxTop: -1,
					},
					// 表格数据，二维数组
					data: [],
				},
			},
		],
	},
};

onMounted(() => {
	const sheetContainer = document.getElementById('container');
	new YSheet(sheetContainer, settings);
});
</script>

<style scoped lang="less"></style>
./YSheet/index.js