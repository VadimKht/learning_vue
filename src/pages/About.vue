<script setup>
import NonHomePage from '../components/NonHomePage.vue';

</script>
<template>
    <NonHomePage>About page</NonHomePage>
    <ul>
        <li><b>npm run dev</b> to run front end server. i've set up cors for 5173 and 4173 ports</li>
        <li>the backend is inside /serverside folder. run <b>node server.cjs</b> in console to start up the server</li>
        <li>my backend creates tables in specific database without creating one, so i'd suggest you to enter sql and create a databse called testdb (or call it other name and change /serverside/db.config.js file)</li>
        <li>this is just a project for me to learn, so there is no password encryption and everything happens in mysql root user</li>
        <li>mysql server must be running</li>
        <li>i followed this tutorial <a href="https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/#Create_Vue_Components">https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/#Create_Vue_Components</a> and then changed stuff up a bit, so some stuff is still named after tutorial and there are some leftovers left</li>		
    </ul>
</template>
<style scoped>
ul{
    margin:24px 120px;
    text-align: center;
}
</style>