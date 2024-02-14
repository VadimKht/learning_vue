<script setup>
const props = defineProps({
    id: Number,
    currentPage: Boolean
});

</script>

<template>
    <button disabled v-if="currentPage" class="pg pg_curpage">{{ id }}</button>
    <button v-else class="pg pg_notcurpage">{{ id }}</button>
</template>

<style scoped>
	.pg{
		margin: auto;
	}
	.pg_notcurpage:hover{
		color: red;
	}
</style>