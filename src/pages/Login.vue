<script setup>
import { RouterLink } from 'vue-router'
import TutorialDataService from "../services/TutorialDataService";
TutorialDataService.Ping().catch((err)=>{
	if(err.code == "ERR_NETWORK") {
		alert("ERR NETWORK");
		return;
	};
	alert("seems there is an error. maybe CORS issue, check /serverside/server.cjs for CORS settings");
});
</script>

<script>
import TutorialDataService from "../services/TutorialDataService";
import {setCookie} from "../common/customfuncs"

export default {
	methods: {
		Loginf(){
			const data = {
				username: document.getElementById("username").value,
				password: document.getElementById("password").value
			};
			TutorialDataService.Login(data)
			.then(res => setCookie("token", res.data.token, 3600))
			.catch(err=>console.log("error! its " + err));
		},
		Registerf(){
			const data = {
				username: document.getElementById("username").value,
				password: document.getElementById("password").value
			};
			TutorialDataService.Register(data)
			.then(res=>{
				setCookie("token", res.data.token, 3600);
				alert("successful register!");
			})
			.catch(err=>{
				if(err.response.status == 409) {
					alert("A user with such username already exists");
					return;
				}
				console.log("error! its " + err);
			});
		}
	}
};
</script>

<template>
	<div class="row justify-even _header">
		<p>Login page</p>
		<RouterLink to="/">Return back to home</RouterLink>
	</div>
	<!--vue router as a server sucks so i'm doing get. normally this should be post-->
	<!--update: i found out i just have to have backend server-->
	<div class="center column _loginverify">
		<br>
		<label for="username">username</label><br>
		<input type="text" name="username" id="username" value=""><br>
		<label for="password">password</label><br>
		<input type="text" name="password" id="password" value=""><br>
		<br>
		<div class="row justify-even">
			<button type="button" @click="Loginf" class="_submit_input">Login</button>
			<button type="button" @click="Registerf" class="_submit_input">Register</button>
		</div>
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
