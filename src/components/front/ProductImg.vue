<template>
<div v-if="isShow" class="fixed flex top-0 right-0 left-0 bottom-0 justify-center items-center z-10">
    <div class="absolute  h-full w-full flex bg-black opacity-70  top-0 left-0"></div>
    <div 
    class="z-888 relative flex justify-center items-center">
        <button 
        class="rounded-full p-2 bg-gray-600 cursor-pointer mr-4">
        <ArrowLeftIcon 
        @click.prevent="preImg"
        class="text-white w-[20px] "></ArrowLeftIcon>
        </button>
        <img class="z-999 max-w-[50%]" :src="getImgs[nowNumber]" alt="">
        <button 
        @click.prevent="nextImg"
        class="rounded-full p-2 bg-gray-600 cursor-pointer ml-4">
        <ArrowRightIcon class="text-white w-[20px]"></ArrowRightIcon>
        </button>
        <div 
        @click.prevent="hideModel"
        class="cursor-pointer absolute top-[-80px] left-[80%]"
        >
        <i class="  bi bi-x-circle text-[30px] text-white"></i>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted,ref,defineExpose } from 'vue';
import { array } from 'yup';
import { ArrowLeftIcon, ArrowRightIcon} from '@heroicons/vue/20/solid';
const allNumber = ref([0,1,2,3,4])
const nowNumber = ref(0)
const isShow = ref(false);
const props = defineProps({
    getImgs:{
        type:array,
        required:true
    }
})
function preImg(){
    nowNumber.value = (nowNumber.value - 1 + props.getImgs.length) % props.getImgs.length;
}
function nextImg(){
    nowNumber.value = (nowNumber.value + 1) % props.getImgs.length;
}
function showModel(){
    isShow.value=true
    console.log(props.getImgs)
}
function hideModel(){
    isShow.value=false
}
// 使用defineExpose来暴露showModel方法
defineExpose({ showModel });

onMounted(() => {
})
</script>