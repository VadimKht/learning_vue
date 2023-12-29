<script setup>
    import { useRoute } from 'vue-router';
    import { getUTCTimeDur } from '../common/customfuncs';
    const route = useRoute();
    let username = route.query.username;
    let password = route.query.password;
    let loggedSucc = false;
    if(username == "root", password == "admin")
    {
        document.cookie = "token=ajawifjaif; expires=" + getUTCTimeDur(10000) + ";SameSite=strict";
        loggedSucc = true;
    }

    document.cookie = "hasLoggedSuccessfully="+ loggedSucc + "; expires=" + getUTCTimeDur(10).getUTCDate() + ";SameSite=strict";
    window.location.replace("/login");
</script>
<template>
    verifying...
</template>