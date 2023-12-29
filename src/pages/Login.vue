<script setup>
import { RouterLink } from 'vue-router'
</script>

<script>
import {cookieExists, getCookieValue} from '../common/customfuncs'

let justLoggedIn = cookieExists("hasLoggedSuccessfully");
let valthing = getCookieValue("hasLoggedSuccessfully");
document.cookie = "hasLoggedSuccessfully=clean;expires=" + new Date().toUTCString() + ";SameSite=strict";
let succLog = (valthing == "true");
</script>

<template>
		<p>Login page</p>
		<RouterLink to="/">Return back to home</RouterLink>
	<form action="/LoginVerify" method="get">
		<br>
		<label for="username">username</label>
		<input type="text" name="username" id="username" value=""><br>
		<label for="password">password</label>
		<input type="text" name="password" id="password" value="">
		<input type="submit" value="Sumbit">
	</form>
	<p v-if="justLoggedIn">
		welcome back
		<p v-if="succLog">correct credential</p>
		<p v-else>incorrect credentials</p>
	</p>
	
</template>
