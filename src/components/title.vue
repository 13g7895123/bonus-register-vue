<template>
    <div>
        <div id='title' class="text-white mt-1 sm:mt-1">{{ title }}</div>
        <div id='server_name' class="text-white mt-3">【{{ serverName }}】</div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { serverInfo } from '../api/server.js'


const route = useRoute();
const title = ref('');
const serverCode = ref('');     // 伺服器代號
const serverName = ref('');     // 伺服器名稱

onMounted(async () => {
    const nowPage = route.path.split('/')[1];
    let titleText = '註冊帳號';
    switch (nowPage){
        case 'forget-password':
            titleText = '找回密碼';
            break;
        case 'account-transfer':
            titleText = '帳號移轉';
            break;
    }
    title.value = titleText;

    serverCode.value = route.params.serverCode;
    const serverResult = await serverInfo(serverCode.value);

    if (serverResult.success){
        serverName.value = serverResult.data.name;
        emit('serverData', serverResult.data);
    }
})

const emit = defineEmits(['serverData']);
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