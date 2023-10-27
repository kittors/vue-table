import { Options } from './sheetDateType';
//默认配置
export const options: Options = {
	workconfig: {
		//工作簿名称
		name: 'y-sheet',
		// 顶部配置
		top: {
			// 顶部选项栏配置
			option: {
				// 是否显示选项栏
				show: true,
			},
			// 顶部菜单栏配置
			menu: {
				// 是否显示菜单栏
				show: true,
			},
		},
		// 主体配置
		body: {
			// 工作表主体配置
			sheets: [
				{
					// 工作表名称
					name: 'sheet1',
					// 表格配置
					tableConfig: {
						canvasView: {
							canvasWidth: 0,
							canvasHeight: 0,
							ctx: null,
						},
						// 标题行列配置
						index: {
							// 是否显示标题行
							displayTopIndex: true,
							// 是否显示标题列
							displayLeftIndex: true,
							// 标题行高度
							height: 25,
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
							height: 25,
							// 行配置数据
							data: [
								{
									// 自定义行高，未设置的会取默认行高
									height: 100,
									flag: '1',
								},
							],
						},
						// 列配置
						cols: {
							// 自定义最大列数
							len: 50,
							// 默认列宽
							width: 110,
							// 行配置数据
							data: [
								{
									// 自定义列宽，未设置的会取默认列宽
									width: 200,
									flag: 'A',
								},
							],
						},
						// 合并单元格
						// merge: { merges: ['A2:B3', 'D5:H9'] },
					},
				},
			],
		},
		// 底部状态栏配置
		bottom: {
			// 是否显示状态栏
			show: false,
		},
	},
};
