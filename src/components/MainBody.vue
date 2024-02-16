<script setup>
	import Animation from "./Animation.vue"
	import PostMessage from "./PostMessage.vue"
	import {cookieExists,getCookieValue} from "./../common/customfuncs"
	import TutorialDataService from "../services/TutorialDataService";
	import ButtonPages from "./ButtonPages.vue";
	import { ref } from "vue"

	let Posts = ref([]);
	const activePage = ref(1);
	let amountofPages = ref(1);
	let pages = ref([]);
	
	// really just updates messages and pages
	function onStart(){
		return new Promise((resv,rej)=>{
			amountofPages.value = TutorialDataService.GetPagesAmount()
			.then((res)=>{
				if(res.data == 0){
					pages.value = [];
					pages.value.push({id: 1, currentPage: true});
					resv('resolved');
					return;
				}
				pages.value = [];
				for(let i = 1; i < res.data+1; i++){
					pages.value.push({id: i, currentPage: (i == activePage.value) ? true : false});
				}
				resv('resolved');
			})
			.catch(err=>{
				rej(err);
			})
		})
	}
	onStart().catch(err=>alert("it seems the server is off or inaccessible. this means the page will not work as intended. follow second instruction on website"));
	
	function reply(id){
		document.getElementById("inputForPost").value += "[replying_to" + id + "] "
	}

	function hoverElemAppear(post, origid){
		const HoverElem = document.getElementById("HoverElem");
		const HoverElemName = document.getElementById("HoverElem_name");
		const msg = document.getElementById("HoverElem_message");

		HoverElem.style.display = "block";
		HoverElemName.innerHTML = post.name;
		msg.innerHTML = post.msg;
		
		const OrigPost = document.getElementById("post" + origid);
		let pageYOffset = document.documentElement.scrollTop;
		const OrigPosOnPage = OrigPost.getBoundingClientRect().top + pageYOffset;
		HoverElem.style.top = OrigPosOnPage + "px";
	}

	function changePage(ownNumber){
		const PrevActiveElement = pages.value.find((element)=>{
			if(element.currentPage == true) return element;
		})
		PrevActiveElement.currentPage = false;
		pages.value[ownNumber-1].currentPage = true;
		activePage.value = ownNumber;
		updatePosts();
		// find out how to rerender vue component just like react does it
	}
	
	function sendPost(){
		if(!cookieExists("token")) {
			alert("You are not logged in! please log in. only logged users can post.");
			return;
		};
		const token = getCookieValue("token");
		TutorialDataService.PostPost({token: token, data: document.getElementById("inputForPost").value})
		.then(msg=>{
			// TODO: for some reason updatePosts doesn't include the post that we just posted. seems that it doesn't actually do it in time.
			// timeout set, CHANGE LATER!
			setTimeout(() => {
				updatePosts();
			}, 200);
			
		})
		.catch(err=>{
			console.log(err);
			alert("some error has happened. maybe you posses token for non existent user? or forgot to turn on the backend server? (console for more info)");
		});
	}

	// it has annoying issue where updating it causes the scroll of page to reset to up. quite annoying. fix later.
	function updatePosts(){
		Posts.value = [];

		TutorialDataService.GetPostPage(activePage.value)
		.then(posts => {
			posts.data.forEach(element => Posts.value.push({id: element.id ,name: element.creator, message: element.content}))
			onStart();
		});
	}
	updatePosts();
</script>
<template>
	<!--appears if you hover over a reply-->
	<div id="HoverElem">
		<p id="HoverElem_name">name</p>
		<p id="HoverElem_message">message</p>
	</div>
	<div class="row">
		<Animation/>
		<div class="center column _content">
			<h4>Welcome to the website</h4>
			<p>Hello and welcome to this website.</p>
			<ul>
				<li><b>npm run dev</b> to run front end server. i've set up cors for 5173 and 4173 ports</li>
				<li>the backend is inside /serverside folder. run <b>node server.cjs</b> in console to start up the server. i use cjs because it gave error when i used js and it asked me to change config. considering it might break something,i just went with changing the extensions to .cjs</li>
				<li>my backend doesn't create database, so i'd suggest you to enter sql and create a databse called testdb (or call it other names and change /serverside/db.config.js file)</li>
				<li>this is just a project for me to learn, so there is no password encryption and everything happens in mysql root user</li>
				<li>mysql server must be running</li>
				<li>i followed this tutorial <a href="https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/#Create_Vue_Components">https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/#Create_Vue_Components</a> and then changed stuff up a bit, so some stuff is still named after tutorial and there are some leftovers left</li>		
			</ul>
		</div>
	</div>
	
	<div class="messagecontrol">
		<input type="text" name="text" id="inputForPost">
		<button class="sndbtn" @click="sendPost">send post! (requires registration)</button>
		<div id="pageButtons" class="pageButtons">
			<!--TODO: figure out how to make-->
			<ButtonPages v-for="page in pages" :id="page.id" :currentPage="page.currentPage" @click="changePage(page.id)"/>
		</div>
		<div id="messagelist">
			<PostMessage v-for="post in Posts" :id="post.id" :username="post.name" :message="post.message" :key="post.id" @reply="reply" @HoverElemAppear="hoverElemAppear"/>
		</div>
	</div>
</template>
<style scoped>
	._content{
		margin-top: 12px;
	}
	.messagecontrol{
		display: flex;
		flex-direction: column;

		max-width: 500px;
		margin: auto;
	}
	.messagecontrol button{
		background-color: aliceblue;
	}
	.messagecontrol button:hover{
		background: whitesmoke;
	}
	#messagelist{
		/* solves annoying issue with screen when you click other page*/
		height: 1200px;
	}
	#inputForPost{
		line-height: 20px;
	}
	#pageButtons{
		margin: auto;
	}
	.sndbtn{
		width: 400px;
		margin: 0 auto;
	}

	/* for some reason overflow does not send on new line */
	#HoverElem{
		width: 300px;
		overflow:visible;
		white-space: initial;
		position:absolute;
		
		background-color: red;
		display:none;
	}
</style>
