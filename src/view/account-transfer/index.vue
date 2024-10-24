<template>
    <Box :initialWidth="350" :initialHeight="480">
        <form id="form_area">
            <div class="inp_group mt-3">
                <select id='inp_account' v-model="account" required>
                    <option 
                    v-for="account in accounts" 
                    :value="account"
                    class="bg-black">{{ account }}</option>
                </select>
                <span class="column">遊戲帳號</span>
                <i></i>
            </div>
            <div class="inp_group mt-2">
                <input id='inp_password' v-model="password" type="password" @blur="passwordBlur" required>
                <span id='col_password' class="column">接收方Token</span>
                <p id='notice_password' class="notice font-extrabold">{{ passwordMsg }}</p>
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
                >提交</div>
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
import { readAccount, updatePassword } from '../../api/member.js';
import { passwordRule } from '../../common/field-rule.js';

const account = ref('');            // 已選擇帳號
const accounts = ref([]);
const password = ref('');
const passwordCheck = ref('');
const userInput = ref('');          // 使用者輸入的驗證碼
const captcha = ref('');            // 存儲驗證碼
const captchaCanvas = ref(null);    // 參考 canvas 元素
const route = useRoute();
const router = useRouter();
const serverCode = ref('');         // 伺服器代號
const token = ref('');   
const passwordMsg = ref('');           

onMounted(async() => {
    serverCode.value = route.params.serverCode;
    token.value = route.params.token;
    generateCaptcha();

    const result = await readAccount({token: token.value});

    if (result.success){
        accounts.value = result.data
    }else{
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '系統提示',
            text: '未註冊帳號，將為您跳轉至註冊頁',
            showConfirmButton: false,
            timer: 1800
        }).then(() => {
            router.push(`/verify/${serverCode.value}`);
        });
    }
})

const getLuminance = (r, g, b) => {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// 計算對比度
const getContrastRatio = (color1, color2) => {
const luminance1 = getLuminance(color1[0], color1[1], color1[2]);
const luminance2 = getLuminance(color2[0], color2[1], color2[2]);
return luminance1 > luminance2
    ? (luminance1 + 0.05) / (luminance2 + 0.05)
    : (luminance2 + 0.05) / (luminance1 + 0.05);
};

const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const getRandomColorWithContrast = (backgroundColor) => {
    let color;
    let contrastRatio;

    // 將背景顏色轉換為RGB
    const bgColorRgb = hexToRgb(backgroundColor);

    // 不斷生成新顏色直到對比度足夠
    do {
        color = getRandomColor();  // 隨機生成字體顏色
        const fontColorRgb = hexToRgb(color);
        contrastRatio = getContrastRatio(bgColorRgb, fontColorRgb);
    } while (contrastRatio < 4.5);  // 對比度要求

    return color;
};

// 隨機生成驗證碼
const generateCaptcha = () => {
    const chars = '1234567890';
    let result = '';
    const length = 4;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captcha.value = result;
    drawCaptcha(); // 在畫布上繪製驗證碼
    userInput.value = '';
//   userInput.value.focus();
};

// 生成隨機顏色
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// 添加雜訊
const addNoise = (ctx, width, height) => {
    const noiseAmount = 30; // 設置雜訊的數量
    for (let i = 0; i < noiseAmount; i++) {
        // 隨機顏色
        ctx.fillStyle = getRandomColor();
        // 隨機位置和大小
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 1; // 雜訊點的大小
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
};

// 在畫布上繪製驗證碼
const drawCaptcha = () => {
    const canvas = captchaCanvas.value;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布

    // 背景顏色
    const backgroundColor = getRandomColor();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 添加雜訊
    addNoise(ctx, canvas.width, canvas.height);

    ctx.font = '24px Arial';

    // 渲染每個字母
    for (let i = 0; i < captcha.value.length; i++) {
        const letter = captcha.value[i];
        
        // 根據背景顏色生成有足夠對比度的字體顏色
        ctx.fillStyle = getRandomColorWithContrast(backgroundColor);

        // 保存當前狀態
        ctx.save();

        // 設置字母的旋轉角度
        const angle = (Math.random() - 1) * 0.5; // 隨機角度 -15度到15度之間
        const x = 10 + i * 25; // 每個字母的X座標
        const y = 25; // 字母的Y座標

        // 移動畫布，然後旋轉
        ctx.translate(x, y);
        ctx.rotate(angle);

        // 繪制字母
        ctx.fillText(letter, 0, 0);

        // 恢復狀態
        ctx.restore();
    }
};

// 確認驗證碼
const checkCaptcha = () => {
    return (captcha.value == userInput.value) ? true : false;
}

// 確認密碼
const checkPassword = () => {
    return (password.value == passwordCheck.value) ? true : false;
}

const submit = async () => {
    const captchaResult = checkCaptcha();
    const filedResult = fieldValidation();

    if (filedResult === true){
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
                    token: token.value,
                }
                const result = await updatePassword(formData);
                const alertIcon = (result.success) ? 'success' : 'error';

                Swal.fire({
                    position: 'center',
                    icon: alertIcon,
                    title: '系統提示',
                    text: result.msg,
                    showConfirmButton: false,
                    timer: 1800
                }).then(() => {
                    if ((result.success)){
                        router.push(`/verify/${serverCode.value}`);
                    }
                });
            }
        }
    }else{
        shortAlert('請依照欄位指示填寫正確資料');
    } 
}

const passwordBlur = () => {
    const result = passwordRule(password.value);
    passwordMsg.value = (result.success === false) ? result.msg : '';
}

/* 欄位驗證 */
const fieldValidation = () => {
    let result = false;
    const passwordResult = passwordRule(password.value);

    if (passwordResult.success === true){
        result = true;
    }else{
        result = false;
    }
    return result;
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