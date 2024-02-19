<script setup>
import { ref } from 'vue';
import TutorialDataService from '../services/TutorialDataService'

const props = defineProps({
    id:Number,
    username: String,
    message: String
});

// TODO: change all <replying_toID> to a href # to that message. challenge is that person from first page migth've hrefed second page
const message = ref(props.message);
const msgParsed = message.value.split(' ');

// the functions are inside parent component ./MainBody.vue
const emit = defineEmits(['reply', 'HoverElemAppear'])

function HoverMsg(arg){
    HashIfNot(arg)
        .then((res)=>{
            emit('HoverElemAppear', res, props.id);
        });
}
function UnHoverMsg(){
    document.getElementById("HoverElem").style.display = "none";
}

// id
// name
// msg
let HashedReplyMessages = [];
function HashIfNot(id){
    return new Promise((resolve, reject) => {
        let HashedPost;
        let hasFound = false;
        // if id is already hashed, return it
        for(let i = 0; i < HashedReplyMessages.length; i++){
            if(HashedReplyMessages[i].id == id){
                hasFound = true;
                HashedPost = HashedReplyMessages[i];
                resolve(HashedPost);
                return;
            } 
        }
        // if id is not hashed, send backend request and hash
        if(!hasFound){
            TutorialDataService.GetPost(id).then(res=>{
                if(res.data.id == null) return;
                HashedReplyMessages.push({id: res.data.id, name: res.data.creator, msg: res.data.content})
                HashedPost = HashedReplyMessages.find(element => element.id == res.data.id);
                resolve(HashedPost);
                return HashedPost;
            })
        }
    })
}

// TODO: change page if a href click is not in current page. change behavior for getElementsbyClassName("linktomsg") somehow
</script>
<template>
    <div class="post" :id="'post'+id">
        <div class="row justify-even">
            <p class="username">Username: {{ username != null ? username : "null" }}</p>
            <span class="idtext">ID: {{ id }}</span>
        </div>
        <div class="row justify-even">
            <p class="message">
                <!-- this is terrible, but it works, find better solution later -->
                <template v-for="msg in msgParsed">
                    <template v-if="msg.substring(0,12) == '[replying_to' && msg.slice(-1) == ']'">
                        <!--mouseover?? not a good design for mobiles-->
                        <a class="linktomsg" @mouseover="HoverMsg(msg.substring(12,msg.length-1))" @mouseleave="UnHoverMsg" v-bind:href="'#post' + msg.substring(12,msg.length-1)">{{ msg + ' ' }}</a>
                    </template>
                    <template v-else>
                         {{ msg + ' ' }}
                    </template>
                </template>
            </p>
            <!--sends function call to reply function in MainBody.vue-->
            <button class="reply_btn"  @click="$emit('reply', id)">reply</button>
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
.idtext{
    font-size: 0.7em;
}
.reply_btn{
    height: 20px;
    align-self: flex-end;
}
</style>