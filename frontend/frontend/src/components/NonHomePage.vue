<template>
     <div class="row justify-even _header">
		<p><slot></slot></p>
		<RouterLink to="/">Return back to home</RouterLink>
	</div>
</template>

<style scoped>
    ._header{
        text-align: center;
        margin: auto;
        margin-top: 20px;
    }
</style>