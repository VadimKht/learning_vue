<!--doesn't work on mobiles-->
<script>
	window.addEventListener("scroll",setScrollVar);
	window.addEventListener("resize",setScrollVar);

function setScrollVar(){
	const HTMLElement = document.documentElement;
	const scrolltop = HTMLElement.scrollTop / window.scrollMaxY;
	const HelloElement = document.getElementById("Hello")
	HelloElement.style.setProperty("translate", (Math.max(10, scrolltop*100)-10)*40+"px " + 800*scrolltop + "px");

	if(scrolltop >= 1)
	{
		document.getElementById("Hello").style.display = "none";
	}
}</script>
<template>
    <div class="Hello" id="Hello">
        hello!
    </div>
</template>
<style scoped>
    .Hello{
        background-color: darkblue;
        position:sticky;
        top:180px;
        left:50%;
    }
</style>