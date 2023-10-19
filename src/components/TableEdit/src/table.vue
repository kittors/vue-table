<template>
	<div ref="sheet"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { YSheet } from '../core/index';
const sheet = ref(null);

onMounted(() => {
	const options = {};
	new YSheet(sheet.value, options);
});
</script>

<style scoped lang="less"></style>
