<template>
    <div id='bg' class="w-full h-full">
        <div id="phone-validation-box" class="rounded-lg">
            <div id="mask"></div>
        </div>
    </div>
    <div id="content">
        <div id="content-box">
            <slot></slot>
        </div>
        
    </div>
</template>
<style scoped>
#content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
#content-box{
    width: 350px;
    height: 510px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    inset: 3px;
    z-index: 2;
}
#bg{
    display: flex;
    align-items: center;
    justify-content: center;
    background: no-repeat;
    background-size: cover;
    background-position: center;
    animation: bg-rotate 5s linear infinite;
    z-index: -1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
@keyframes bg-rotate{
    100% {
        filter: hue-rotate(360deg);
    }
} 
/* --- scroll bar hide end --- */
#mask{
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    position: absolute;
    top: 3px;
    left: 3px;
    border-radius: 8px;
    background-color: black;
    z-index: 1;
}
#phone-validation-box{
    width: 350px;
    height: 510px;
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(10px);
    overflow: hidden;
    inset: 3px;
    z-index: 2;
}
#phone-validation-box::before{
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 400px;
    height: 510px;
    background: linear-gradient(60deg, transparent, #45f3ff, #45f3ff);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    z-index: -1;
}
#phone-validation-box::after{
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 400px;
    height: 510px;
    background: linear-gradient(60deg, transparent, #d9138a, #d9138a);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    animation-delay: -3s;
    z-index: -1;
}
@keyframes animate{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
/* 針對插槽內的按鈕，排除背景變色效果 */
::slotted(button) {
    position: relative;
    background-color: initial;
    color: initial;
    box-shadow: none;
    transition: none;
    filter: none;
    z-index: 1;
}

::slotted(button:hover) {
  background-color: initial;
  color: initial;
}
</style>