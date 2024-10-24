<template>
    <canvas ref="particleCanvas" @mousemove="handleMouseMove"></canvas>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  // 引用 canvas 元素
  const particleCanvas = ref(null);
  
  // 滑鼠位置，初始設置在窗口中心
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  // 粒子組的中心點，初始設置為滑鼠位置
  let center = { x: mouse.x, y: mouse.y };
  
  // 定義粒子的屬性（固定顏色和相對位置）
  const particles = [
    { angle: 0, radius: 30, color: '#FF5733' },    // 粒子1
    { angle: 36, radius: 30, color: '#33FF57' },   // 粒子2
    { angle: 72, radius: 30, color: '#3357FF' },   // 粒子3
    { angle: 108, radius: 30, color: '#F3FF33' },  // 粒子4
    { angle: 144, radius: 30, color: '#FF33A1' },  // 粒子5
    { angle: 180, radius: 30, color: '#33FFF3' },  // 粒子6
    { angle: 216, radius: 30, color: '#FFA533' },  // 粒子7
    { angle: 252, radius: 30, color: '#33A1FF' },  // 粒子8
    { angle: 288, radius: 30, color: '#A133FF' },  // 粒子9
    { angle: 324, radius: 30, color: '#FF3333' },  // 粒子10
  ];
  
  // 處理滑鼠移動事件，更新滑鼠位置
  const handleMouseMove = (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  };
  
  // 線性插值函數，用於平滑移動
  const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  };
  
  // 動畫 ID，用於取消動畫循環
  let animationId;
  
  // 主動畫循環
  const animate = () => {
    const canvas = particleCanvas.value;
    const ctx = canvas.getContext('2d');
  
    // 平滑地將中心點移動到滑鼠位置
    center.x = lerp(center.x, mouse.x, 0.05);
    center.y = lerp(center.y, mouse.y, 0.05);
  
    // 清空畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // 繪制粒子
    particles.forEach(particle => {
      // 計算粒子的位置，增加時間以實現旋轉效果
      const angleInRadians = (particle.angle + Date.now() * 0.02) * Math.PI / 180;
      const x = center.x + particle.radius * Math.cos(angleInRadians);
      const y = center.y + particle.radius * Math.sin(angleInRadians);
  
      // 繪制粒子
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2); // 粒子半徑設為10
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
  
    // 繪制連線
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const angleI = (particles[i].angle + Date.now() * 0.02) * Math.PI / 180;
        const x1 = center.x + particles[i].radius * Math.cos(angleI);
        const y1 = center.y + particles[i].radius * Math.sin(angleI);
  
        const angleJ = (particles[j].angle + Date.now() * 0.02) * Math.PI / 180;
        const x2 = center.x + particles[j].radius * Math.cos(angleJ);
        const y2 = center.y + particles[j].radius * Math.sin(angleJ);
  
        const distance = Math.hypot(x2 - x1, y2 - y1);
        const maxDistance = 100;
  
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'; // 連線顏色和透明度
          ctx.lineWidth = 1;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }
  
    // 重複動畫循環
    animationId = requestAnimationFrame(animate);
  };
  
  // 初始化粒子並開始動畫
  onMounted(() => {
    const canvas = particleCanvas.value;
    const ctx = canvas.getContext('2d');
  
    // 設置畫布尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // 開始動畫
    animate();
  
    // 處理窗口尺寸調整
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
  
    window.addEventListener('resize', handleResize);
  
    // 清理動畫循環和事件監聽器
    onBeforeUnmount(() => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    });
  });
  </script>
  
  <style scoped>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1; /* 確保畫布在背景層 */
    width: 100%;
    height: 100%;
  }
  </style>
  