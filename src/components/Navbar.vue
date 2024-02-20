<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
p,h1,h2,h3,h4,h5,h6,a{
	margin: auto 0;
}
._header *{
	margin-top: auto;
	margin-bottom: auto;
}
.links{
	margin-right: 12px;
}

</style>

<template>
	<div class="row justify-even _header">
		<div class="row anchor-left">
			<h1>
				My website
			</h1>
		</div>
		<div class="anchor-right">
			<RouterLink class="links" to="/login">login</RouterLink>
			<RouterLink class="links" to="/about">about</RouterLink>
		</div>
	</div>
</template>
