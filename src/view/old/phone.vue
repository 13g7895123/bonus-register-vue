<template>
    <Box>
        <div class="h-[25%]">
            <div id='title' class="text-white mt-12">註冊帳號</div>
            <div id='server_name' class="text-white mt-3">【測試伺服器】</div>
        </div>
        <div class="w-[80%] flex　flex-col items-center">
            <div class="inp_group mt-3">
                 <input id='inp_phone' required>
                <span class="">手機號碼</span>
                <i></i>
            </div>
            <div class="inp_group mt-2">
                <input id='inp_validationCode' required>
                <span class="column">驗證碼</span>
                <i style="width: 58%;"></i>
                <p id='identifyCode'></p>
            </div>
            <div class="inp_group mt-2">
                <input id='inp_code' required>
                <span>認證碼</span>
                <i style="width: 60%;"></i>
                <div id='btn_sendCode' class="btn">發送認證碼</div>
            </div>
            <div class="rounded flex justify-center items-center btn py-1 mb-2 mt-6" id='btn_submit'>送出</div>
            <div class="login-container w-full">
                <button class="line-login-btn" @click="lineLogin">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE Logo" class="line-logo" />
                <span>LINE 登入</span>
                </button>
            </div>
        </div>
        <!-- <div class="h-[3%] w-[80%]">
            <hr>
        </div>
        <div class="h-[30%] w-[80%] flex flex-col justify-center">
            <div
            class="w-full bg-white rounded flex justify-center items-center btn py-1"
            @click = "router.push('/forgetPassword')"
            >找回密碼
            </div>
            <div 
            class="w-full bg-white rounded flex justify-center items-center btn py-1 mt-5"
            @click = ""
            >客服中心
            </div>
        </div> -->
    </Box>
</template>
<script setup>
import Box from '../components/box.vue';

</script>
<style scoped>
.btn{
    color: #555;
}
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

#btn_sendCode{
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