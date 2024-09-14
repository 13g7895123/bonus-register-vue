<template>
    <Box :initialWidth="350" :initialHeight="520">
        <Title/>
        <form id="form_area">
            <div class="inp_group mt-3">
                <input id='inp_account' v-model="account" @blur="accountRule" required>
                <span class="column">遊戲帳號</span>
                <p id='notice_account' class="notice text-red"></p>
                <i></i>
            </div>
            <div class="inp_group mt-2">
                <input id='inp_password' v-model="password" type="password" required>
                <span id='col_password' class="column">密碼</span>
                <p id='notice_password' class="notice"></p>
                <i></i>
            </div>
            <div class="inp_group mt-2">
                <input id='inp_checkPassword' v-model="passwordCheck" type="password" required style="white-space: normal;">
                <span class="column">確認密碼</span>
                <i></i>
            </div>
            <div class="inp_group mt-2 flex">
                <input id='inp_validationCode' v-model='userInput' required>
                <span class="column">驗證碼</span>
                <i style="width: 58%;"></i>
                <canvas ref="captchaCanvas" @click="generateCaptcha" class='bg-[#BDBDBD] cursor-pointer' width="100" height="30"></canvas>
            </div>
            <div 
                id="btn-submit"
                class="bg-[#42A5F5] text-white font-bold rounded-lg flex justify-center items-center py-2 mt-6 cursor-pointer"
                @click="submit"
                >提交註冊</div>
            <div
                id='btn-cancel-register'
                class="bg-[#BDBDBD] text-[#555] font-bold rounded-lg flex justify-center items-center py-2 mt-3 cursor-pointer"
                >取消註冊</div>
        </form>
    </Box>
</template>
<script setup>
import Box from '../components/box.vue';
import Title from '../components/title.vue';
import { ref, onMounted } from 'vue';
import { shortAlert } from '../alert.js';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';

const account = ref('');
const password = ref('');
const passwordCheck = ref('');
const userInput = ref('');          // 使用者輸入的驗證碼
const captcha = ref('');            // 存儲驗證碼
const captchaCanvas = ref(null);    // 參考 canvas 元素
const route = useRoute();
const serverCode = ref('');     // 伺服器代號

onMounted(() => {
    serverCode.value = route.params.serverCode;
    generateCaptcha();
})

// 隨機生成驗證碼
const generateCaptcha = () => {
  captcha.value = Math.random().toString(36).substr(2, 4).toUpperCase();
  drawCaptcha(); // 在畫布上繪製驗證碼
  userInput.value = '';
//   userInput.value.focus();
};

// 在畫布上繪製驗證碼
const drawCaptcha = () => {
    const canvas = captchaCanvas.value;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000'; // 字體顏色
    ctx.fillText(captcha.value, 20, 25); // 繪製驗證碼到畫布上
};

// 確認驗證碼
const checkCaptcha = () => {
    return (captcha.value == userInput.value) ? true : false;
}

// 確認密碼
const checkPassword = () => {
    return (password.value == passwordCheck.value) ? true : false;
}

const submit = () => {
    const captchaResult = checkCaptcha();
    if (captchaResult === false){
        shortAlert('驗證碼輸入錯誤，請重新確認');
    }else{
        const passwordResult = checkPassword();
        if (passwordResult === false){
            shortAlert('密碼有誤，請重新確認');
        }else{
            const formData = {
                account: account.value,
                password: password.value,
                server_code: serverCode.value,
            }
            console.log(formData)
        }
    }
}
</script>
<style scoped>
h2, h3, #form_area{
    z-index: 20;
}
#form_area{
    width: 80%;
}
.inp_group{
    /* margin-top: 0.5em; */
    position: relative;
}
.inp_group input{
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    color: #fff;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
}
.inp_group span{
    position: absolute;
    left: 0;
    padding: 20px 10px 10px;
    font-size: 1em;
    color: #fff;
    pointer-events: none;
    letter-spacing: 0.05em;
    transition: 0.5s;
}
.inp_group input:valid ~span,
.inp_group input:focus ~span{
    font-size: 0.75em;
    transform: translate(-10px, -15px);
}
.inp_group i{
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 2px;
}
#btn_send_code{
    padding: 2px 10px 2px 10px;
    border-radius: 5px;
    position: absolute;
    right: 0px;
    top: 20px;
}
.btn{
    display: flex;
    cursor: pointer;
    background-color: #fff;
}
.code-box{
    position: absolute;
    right: 0;
    top: 14px;
}
#identifyCode { 
    cursor: pointer;
    font-family:Arial; 
    font-style:italic; 
    font-weight:bold; 
    border:0; 
    letter-spacing:2px; 
    color:blue;
    background-color: red;
    padding:4px;
    width:110px;
    height:40px;
    text-align:center;
    position: absolute;
    right: 0;
    top: 14px;
}
.notice{
    position: absolute !important;
    left: auto !important;
    font-size: 0.8rem !important;
    color: red !important;
    transform: none !important;
    right: 0;
    top: 30px;
}
</style>