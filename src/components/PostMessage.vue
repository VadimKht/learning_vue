<script setup>
defineProps({
    username: String,
    message: String
});
</script>
<template>
    <div class="post">
    <p class="username">Username: {{ username != null ? username : "null" }}</p>
    <p class="message">{{ message != null ? message : "null" }}</p>
    </div>
</template>
<style scoped>
.post{
    color:white;
    background-color: black;
    border-radius: 8px;
    max-width: 600px;
    padding: 8px 12px;
    margin: 12px auto;
}
</style>