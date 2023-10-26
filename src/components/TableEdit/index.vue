<template>
	<div :class="`${cssPrefix}`">
		<div :class="`${cssPrefix}-header`"></div>
		<div :class="`${cssPrefix}-main`">
			<div :class="`${cssPrefix}-center`">
				<TableViewVue></TableViewVue>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { cssPrefix } from './const/Constant';
import TableViewVue from './ChildComponents/Table/TableView';

const props = defineProps({
	config: Object,
});

onMounted(() => {});
</script>

<style scoped lang="less"></style>
