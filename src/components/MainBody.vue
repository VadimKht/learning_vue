<script setup>
	import PostMessage from "./PostMessage.vue"
	import {cookieExists, getCookieValue} from "./../common/customfuncs"
	import TutorialDataService from "../services/TutorialDataService";
	import ButtonPages from "./ButtonPages.vue";
	import { ref } from "vue"

	let Posts = ref([]);
	const activePage = ref(1);
	let amountofPages = ref(1);
	let pages = ref([]);
	
	// really just updates messages and pages
	function updatePages(){
		return new Promise((resv,rej)=>{
			amountofPages.value = TutorialDataService.GetPagesAmount()
			.then((res)=>{
				if(res.data == 0){
					// if there is no posts, it just leaves a single selected page instead of not rendering one at all.
					pages.value = [{id: 1, currentPage: true}];
					resv('resolved');
					return;
				}
				// !
				let virtualPages = [];

				for(let i = 1; i < res.data+1; i++){
					virtualPages.push({id: i, currentPage: (i == activePage.value) ? true : false});
					pages.value = virtualPages;
				}
				resv('resolved');
			})
			.catch(err=>{
				rej(err);
			})
		})
	}

	function reply(id){
		// temporary solution
		document.getElementById("inputForPost").value += " [replying_to" + id + "] "
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
	}
	
	function sendPost(){
		if(!cookieExists("token")) {
			alert("You are not logged in! only logged users can post.");
			return;
		};
		const token = getCookieValue("token");
		const data = document.getElementById("inputForPost").value;
		TutorialDataService.PostPost({token: token, data: data})
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

	// postsVirtual is made because first i planned to refresh Posts.value, but it updates DOM and therefore causes
	// screen to shift when changing page. so i made postsVirtual that i later assign to Posts.value later
	//
	// consider hashing in cookies to prervent needless backend requests on restart/message send?
	function updatePosts(){
		TutorialDataService.Ping().catch(err=>{
			alert("your server most likely isn't up, or CORS is not set up correctly")
		});
		let postsVirtual = [];

		TutorialDataService.GetPostPage(activePage.value)
		.then(posts => {
			posts.data.forEach(element => {
				const message = element.content;
				postsVirtual.push({id: element.id ,name: element.creator, message: message})
			});
			Posts.value = postsVirtual;
			updatePages();
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
	<div class="center column _content">
		<h4>Welcome to the website</h4>
		<p>If something doesn't work or need more information, open <RouterLink to="/about">about page</RouterLink></p>
	</div>
	
	<div class="messagecontrol">
		<input type="text" name="text" id="inputForPost">
		<button class="sndbtn" @click="sendPost">send post! (requires registration)</button>
		<div id="pageButtons" class="pageButtons">
			<ButtonPages v-for="page in pages" :id="page.id" :currentPage="page.currentPage" @click="changePage(page.id)"/>
		</div>
		<div id="messagelist">
			<PostMessage v-for="post in Posts" :id="post.id" :username="post.name" :message="post.message" :key="post.id" @reply="reply" @HoverElemAppear="hoverElemAppear" @updatePosts="updatePosts"/>
		</div>
	</div>
</template>
<style scoped>
	._content{
		margin-top: 12px;
	}
	._content p{
		max-width: 800px;
		margin: 0 auto 24px auto;
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
	/* if the text is too big and reply is at the bottom, the reply expands the page, but scrolling down there is hard. find a way to make the text instead go up */
	#HoverElem{
		width: 300px;

		position:absolute;
		border-radius: 12px;
		border: 8px #804040 solid;
		padding: 0 12px;

		background-color: #404040;
		display:none;
	}
</style>
