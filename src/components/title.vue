<template>
    <div>
        <div id='title' class="text-white mt-12">註冊帳號</div>
        <div id='server_name' class="text-white mt-3">【{{ serverName }}】</div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { serverInfo } from '../api/server.js'

const route = useRoute();
const serverCode = ref('');     // 伺服器代號
const serverName = ref('');     // 伺服器名稱

onMounted(async () => {
    serverCode.value = route.params.serverCode;
    const serverResult = await serverInfo(serverCode.value);

    if (serverResult.success){
        serverName.value = serverResult.data.name;
    }
})
</script>
<style scoped>
#title{
    display: block;
    font-size: 1.5em !important;
    margin-top: 48px;
    z-index: 20;
}
#server_name{
    display: block;
    font-size: 1.17em !important;
    z-index: 20;
}
</style>