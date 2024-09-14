<template>
  <div class="captcha-container">
    <!-- 顯示驗證碼按鈕 -->
    <button @click="generateCaptcha">Show Captcha</button>
    <div v-if="captcha">
      <!-- 顯示驗證碼 -->
      <canvas ref="captchaCanvas" width="150" height="50"></canvas>
    </div>

    <div class="captcha-input">
      <!-- 使用者輸入驗證碼 -->
      <input v-model="userInput" placeholder="Enter Captcha" />
      <button @click="validateCaptcha">Validate</button>
    </div>

    <p v-if="validationMessage" :class="{'success': isSuccess, 'error': !isSuccess}">
      {{ validationMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const captcha = ref('');  // 存儲驗證碼
const userInput = ref('');  // 使用者輸入
const validationMessage = ref('');  // 驗證訊息
const isSuccess = ref(false);  // 驗證結果

const captchaCanvas = ref(null); // 參考 canvas 元素

// 隨機生成驗證碼
const generateCaptcha = () => {
  captcha.value = Math.random().toString(36).substr(2, 5).toUpperCase();
  drawCaptcha(); // 在畫布上繪製驗證碼
};

// 在畫布上繪製驗證碼
const drawCaptcha = () => {
  const canvas = captchaCanvas.value;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
  ctx.font = '30px Arial';
  ctx.fillStyle = '#000'; // 字體顏色
  ctx.fillText(captcha.value, 20, 35); // 繪製驗證碼到畫布上
};

// 驗證使用者輸入
const validateCaptcha = () => {
  if (userInput.value.toUpperCase() === captcha.value) {
    validationMessage.value = 'Captcha is correct!';
    isSuccess.value = true;
  } else {
    validationMessage.value = 'Captcha is incorrect. Try again.';
    isSuccess.value = false;
  }
};
</script>

<style scoped>
.captcha-container {
  text-align: center;
  margin-top: 20px;
}
.captcha-display {
  margin-bottom: 10px;
}
.captcha-input {
  margin-bottom: 10px;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
