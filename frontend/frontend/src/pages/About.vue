<script setup>
import NonHomePage from '../components/NonHomePage.vue';

</script>
<template>
    <NonHomePage>About page</NonHomePage>
    <ul>
        <li>There used to be an instruction here, but I've automatized everything using docker.</li>
        <li>The db connection data uses container names</li>
        <li>For main part of actual app, i followed this tutorial <a href="https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/#Create_Vue_Components">https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/#Create_Vue_Components</a> and then changed stuff up a bit, so some stuff is still named after tutorial and there are some leftovers left</li>		
    </ul>
</template>
<style scoped>
ul{
    margin:24px 120px;
    text-align: center;
}
</style>
