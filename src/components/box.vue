<template>
    <div id='bg' class="w-full h-full">
        <div id="box"
        :class="`rounded-lg`"
        :style="`--box-width: ${boxWidth}px; --box-height: ${boxHeight}px; width: ${boxWidth}px; height: ${boxHeight}px;`">
            <div id="mask"></div>
        </div>
    </div>
    <div id="content">
        <div id="content-box" :style="`width: ${boxWidth}px; height: ${boxHeight}px;`">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
    initialWidth: {
        type: Number,
        default: 100,
    },
    initialHeight: {
        type: Number,
        default: 100,
    },
});

const boxWidth = ref(props.initialWidth);
const boxHeight = ref(props.initialHeight);

</script>
<style scoped>
#content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
#content-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    inset: 3px;
    z-index: 2;
}
#box{
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(10px);
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

#box::before{
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: var(--box-width);
    height: var(--box-height);
    background: linear-gradient(60deg, transparent, #45f3ff, #45f3ff);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    /* z-index: -1; */
}
#box::after{
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: var(--box-width);
    height: var(--box-height);
    background: linear-gradient(60deg, transparent, #d9138a, #d9138a);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    animation-delay: -3s;
    /* z-index: -1; */
}
@keyframes animate{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>