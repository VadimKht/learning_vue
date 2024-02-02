<template>
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
			<li>you can create several users with same name and password which is a stupid bug but i will fix it later</li>
		</ul>
	</div>
</template>
<style scoped>
	._content{
		margin-top: 12px;
	}
</style>
