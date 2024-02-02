<script setup>
    import { useRoute } from 'vue-router';
    import { getUTCTimeDur, setCookie } from '../common/customfuncs';
    const route = useRoute();
    let username = route.query.username;
    let password = route.query.password;
    let authmethod = route.query.AuthMethod;
    let loggedSucc = false;
    if(authmethod == "Login")
    {
        // check database entry
        if(username == "root", password == "admin")
        {
            // later generate random token
            document.cookie = "token=ajawifjaif; expires=" + getUTCTimeDur(10000) + ";SameSite=strict";
            loggedSucc = true;
        }
        setCookie("hasLoggedSuccessfully", loggedSucc, 10);
    }
    if(authmethod == "Register")
    {
        setCookie("registered", "yes", 10)
        // create new database entry
    }

    
    window.location.replace("/login");
</script>
<template>
    verifying...
</template>