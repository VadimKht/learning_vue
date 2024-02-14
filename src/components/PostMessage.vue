<script setup>
defineProps({
    id:Number,
    username: String,
    message: String,
});

const emit = defineEmits(['reply'])
</script>
<template>
    <div class="post">
        <p class="username">Username: {{ username != null ? username : "null" }}</p>
        <div class="row justify-even">
            <p class="message">{{ message != null ? message : "null" }}</p>
            <button class="reply_btn" @click="$emit('reply', id)">reply</button>
        </div>
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
.reply_btn{
    height: 20px;
    align-self: flex-end;
}
</style>