<template>
    <Box :initialWidth="350" :initialHeight="290" @serverData="handleServerData">
        <div class="w-[80%] flex　flex-col items-center">
            <div class="login-container w-full mt-5">
                <button class="line-login-btn" @click="lineLogin">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE Logo" class="line-logo" />
                <span>LINE 登入</span>
                </button>
            </div>
        </div>
        <div class="h-[3%] w-[80%] mt-5">
            <hr>
        </div>
        <div class="h-[30%] w-[80%] flex flex-col mt-3">
            <div
            class="w-full bg-[#c4c4c4] hover:bg-[#b3b3b3] text-[#555] font-bold rounded-lg flex justify-center items-center cursor-pointer py-2"
            @click = "router.push(`/verify/${serverCode}`)"
            >回到註冊帳號
            </div>
        </div>
    </Box>
</template>
<script setup>
import Box from '../../components/box.vue';
import { lineParams, lineLoginBaseUrl, scope } from '../../config.js';
import { saveStateApi } from '../../api/line.js'
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const serverCode = ref('');

onMounted(() => {
    serverCode.value = route.params.serverCode;
});

const handleServerData = (data) => {
    serverCode.value = data.code_name;
}

const lineLogin = async() => {
    lineParams.state = generateUniqueCode();
    await saveState();    // 儲存state

    const params = new URLSearchParams(lineParams).toString();
    const lineLoginUrl = `${lineLoginBaseUrl}?${params}&scope=${scope}`;

    window.location.href = lineLoginUrl;
}

const saveState = async() => {
    const data = {
        state: lineParams.state,
        serverCode: serverCode.value,     
        page: 'forget-password',   
    }
    const result = await saveStateApi(data);
    
    if (!(result.success)){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '系統提示',
            text: '程序錯誤，請聯繫管理員',
            showConfirmButton: false,
            timer: 1800
        })
        throw new Error("status api error");   
    }
}

const generateUniqueCode = () => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 8);
    const uniqueCode = timestamp + randomString;

    return uniqueCode;
}
</script>
<style scoped>
.btn{
    display: flex;
    cursor: pointer;
    background-color: #fff;
    color: #555;
}
.swal2-container{
    position: absolute;
}
#go_top{
    width: 80%;
    z-index: 999;
}
.login-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.line-login-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #00b900, #00c300);
    border: none;
    /* border-radius: 50px; */
    padding: 10px 25px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 3;
}
.line-login-btn:hover {
  background: linear-gradient(135deg, #009e00, #00b900);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.line-logo {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

</style>