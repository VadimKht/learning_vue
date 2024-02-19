<!--doesn't work on mobiles-->
<script>
	const scrlist = window.addEventListener("scroll",setScrollVar);
	const reslist = window.addEventListener("resize",setScrollVar);

// this is horrible; this function is called for each Animation component. fix later
function setScrollVar(){
	const HTMLElement = document.documentElement;
	const scrolltop = HTMLElement.scrollTop / (HTMLElement.scrollHeight - HTMLElement.clientHeight);
	const HelloElement = document.getElementsByClassName("Hello");
	if(HelloElement.length == 0) {
		window.removeEventListener("scroll",scrlist);
		window.removeEventListener("resize",reslist);
		return;
	}

	HelloElement[0].style.setProperty("translate", "0px " + 1000*scrolltop + "px");

	if(scrolltop >= 1)
	{
		for(let i = 0; i< HelloElement.length; i++){
			HelloElement[i].remove();
		}
	}
}</script>
<template>
    <div class="Hello">
        hello!
    </div>
</template>
<style scoped>
    .Hello{
        background-color: darkblue;
        position:sticky;
        top:180px;
    }
</style>