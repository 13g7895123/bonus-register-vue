<template>
    <Box :initialWidth="350" :initialHeight="480">
        <form id="form_area">
            <hr class="mt-3">
            <div class="mt-2 text-lg font-extrabold">
                <div>您好，以下為您的接收代碼</div>
                <div class="mt-2">【{{ receiverToken }}】</div>
                <div class="mt-1">請轉交給帳號轉移者</div>
                <div class="mt-1">以完成帳號轉移</div>
                <div class="mt-1 text-red-500 text-2xl">並請停留在此頁面</div>
                <div class="mt-1">待跳出提示通知即完成轉移</div>
            </div>
            <div 
                id="btn-submit"
                class="bg-[#42A5F5] text-white font-bold rounded-lg flex justify-center items-center py-2 mt-3 cursor-pointer"
                @click="submit"
                >點我複製</div>
            <div
                id='btn-cancel-register'
                class="bg-[#BDBDBD] text-[#555] font-bold rounded-lg flex justify-center items-center py-2 mt-3 cursor-pointer"
                @click = "router.push(`/verify/${serverCode}`)"
                >取消</div>
        </form>
    </Box>
</template>
<script setup>
import Box from '../../components/box.vue';
import { ref, onMounted } from 'vue';
import { shortAlert } from '../../alert.js';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import { receiver } from '../../api/member.js';

const serverCode = ref('');         // 伺服器代號
const token = ref('');   
const receiverToken = ref('');

const route = useRoute();
const router = useRouter();      

onMounted(async() => {
    serverCode.value = route.params.serverCode;
    token.value = route.params.token;

    /* Token驗證(特定Token代表賴驗證失敗，要跳出通知) */

    const result = await receiver(token.value);
    receiverToken.value = result.data;


    // const result = await readAccount({token: token.value});

    // if (result.success){
    //     accounts.value = result.data;
    // }else{
    //     Swal.fire({
    //         position: 'center',
    //         icon: 'warning',
    //         title: '系統提示',
    //         text: '未註冊帳號，將為您跳轉至註冊頁',
    //         showConfirmButton: false,
    //         timer: 1800
    //     }).then(() => {
    //         // router.push(`/verify/${serverCode.value}`);
    //     });
    // }
})

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
.inp_group input,
.inp_group select{
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    color: #fff;
    background-color: transparent;
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
.inp_group input:focus ~span,
.inp_group select:valid ~span,
.inp_group select:focus ~span{
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