<script setup>
import { RouterLink } from 'vue-router'
import NonHomePage from '../components/NonHomePage.vue';
import TutorialDataService from "../services/TutorialDataService";
TutorialDataService.Ping().catch((err)=>{
	if(err.code == "ERR_NETWORK") {
		alert("your backend is not turned on on properly. you cannot register or login.");
		return;
	};
	alert("seems there is an error. maybe CORS issue, check /serverside/server.cjs for CORS settings");
});
</script>

<script>
import TutorialDataService from "../services/TutorialDataService";
import {setCookie} from "../common/customfuncs"

// later use special encryption here
function Encrypt(password){
	return password;
}

export default {
	methods: {
		Loginf(){
			const encrypted_pass = Encrypt(document.getElementById("password").value);
			const data = {
				username: document.getElementById("username").value,
				password: encrypted_pass
			};
			TutorialDataService.Login(data)
			.then(res => {
				setCookie("token", res.data.token, 3600);
				setCookie("username", document.getElementById("username").value, 3600);
			})
			.catch(err=>console.log("error! its " + err));
		},
		Registerf(){
			const encrypted_pass = Encrypt(document.getElementById("password").value);
			const data = {
				username: document.getElementById("username").value,
				password: encrypted_pass
			};
			TutorialDataService.Register(data)
			.then(res=>{
				setCookie("token", res.data.token, 3600);
				setCookie("username", document.getElementById("username").value ,3600)
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
	<NonHomePage>Login page</NonHomePage>
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
