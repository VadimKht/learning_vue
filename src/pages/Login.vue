<script setup>
import { RouterLink } from 'vue-router'
</script>

<script>
import {cookieExists, getCookieValue, setCookie} from '../common/customfuncs'

let justLoggedIn = cookieExists("hasLoggedSuccessfully");
let valthing = getCookieValue("hasLoggedSuccessfully");
let registeredChosen = cookieExists("registered");
let registeredsuccOrNot = getCookieValue("registered");
document.cookie = "hasLoggedSuccessfully=clean;expires=" + new Date().toUTCString() + ";SameSite=strict";
setCookie("registered", "clean", 0);
let succLog = (valthing == "true");
</script>

<template>
	<div class="row justify-even _header">
		<p>Login page</p>
		<RouterLink to="/">Return back to home</RouterLink>
	</div>
		<!--vue router as a server sucks so i'm doing get. normally this should be post-->
	<form action="/LoginVerify" method="get" class="center column _loginverify">
		<br>
		<label for="username">username</label><br>
		<input type="text" name="username" id="username" value=""><br>
		<label for="password">password</label><br>
		<input type="text" name="password" id="password" value=""><br>
		<br>
		<div class="row justify-even">
			<input type="submit" name="AuthMethod" value="Login" class="_submit_input">

			<input type="submit" name="AuthMethod" value="Register" class="_submit_input">
		</div>
	</form>
	<!--disasterous way to do this to be honest-->
	<div v-if="registeredChosen" class="center column">
		welcome back
		<p v-if="registeredsuccOrNot">Successful register!</p>
		<p v-else>unsuccessful registration</p>
	</div>
	<div v-else v-if="justLoggedIn" class="center column">
		welcome back
		<p v-if="succLog">correct credential</p>
		<p v-else>incorrect credentials</p>
	</div>
	
</template>
<style scoped>
._header{
	margin-bottom: 12px;
}
._loginverify
{
	padding: 12px 16px 32px 16px;
	border-radius: 6px;
	border: 4px #13AFAC solid;
	max-width: 400px;
	margin: auto;
	background-color: #31FACA;
}
._loginverify ._submit_input{
	margin-top: 12px;
	width: 40%;
}
</style>