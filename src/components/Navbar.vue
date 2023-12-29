<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
p,h1,h2,h3,h4,h5,h6,a{
	margin: auto 0;
}
</style>

<template>
	<div class="row even_justify">
		<div class="row anchor-left">
			<h1>
				My website
			</h1>
			<p>
				hello world
			</p>
		</div>
		<div class="anchor-right">
			<slot></slot>
			<RouterLink to="/login">login</RouterLink>
		</div>
	</div>
</template>
