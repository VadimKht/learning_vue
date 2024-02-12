<script setup>
const props = defineProps({
    id: Number,
    currentPage: Boolean
});

</script>

<template>
    <button disabled v-if="currentPage">{{ id }}</button>
    <button v-else>{{ id }}</button>
</template>