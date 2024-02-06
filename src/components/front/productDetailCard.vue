<template>
    <div class="bg-white p-4 ">
    <div class="grid grid-cols-2 ">
        <img :src="product.imageUrl" alt="" class="max-h-[200px] ">
        <div class="grid grid-cols-2 ml-2">
        <span  v-for="(item, index) in product.imagesUrl" :key="index"  @click.prevent="$emit('open-model',product.imagesUrl)">
            <img v-if="index<4" :src="item" class="max-h-[100px] " alt="">
        </span>
        </div>
    </div>
    <div class="flex w-full justify-between mt-4 mb-4 items-center text-lg font-bold text-primary-500">
        月租/${{ product.price }}
        <span>
            <BUTTON :size="'m'" @click.prevent="$emit('add-to-cart',product)">聯絡我們</BUTTON>
        </span>
    </div>
    <hr>
    <div class="mt-3">
        <div class="text-lg text-primary-500 font-bold mb-2 flex items-center">
            <BriefcaseIcon class="h-5 w-5 mr-2"></BriefcaseIcon>
            <span>租屋資訊</span>
        </div>
        <div class="bg-gray-300 inline-block px-2 text-sm  mb-2">
            {{ product.unit }}
        </div>
        <div class="mb-2">
            {{ product.title }}
        </div>
        <div class="mb-2">
            地址:
            <br>
            {{ product.description }}
        </div>
        <div class="mb-2">
            租屋介紹:
            <br>
            {{ product.content }}
        </div>
    </div>
    <hr>
    <div class="mt-3">
        
        <div class="text-lg text-primary-500 font-bold mb-2 flex items-center">
            <BriefcaseIcon class="h-5 w-5 mr-2"></BriefcaseIcon>
            <span>設備與服務</span>
        </div>
        <div class="mb-2">
             <i class="bi bi-calendar-event mr-2"></i>租住說明
            <br>
            {{ product.tagTIME }}
        </div>
        <div class="mb-2">
             <i class="bi bi-info-circle mr-2"></i>房屋守則
            <br>
            {{ product.tagRULE }}
        </div>
        <div class="mb-2">
             <i class="bi bi-info-circle mr-2"></i>提供設備
            <br>
            {{ product.tagEQ }}
        </div>
    </div>
    <hr>
    <div class="mt-3">
        <div class="text-lg text-primary-500 font-bold mb-2 flex items-center">
            <BriefcaseIcon class="h-5 w-5 mr-2"></BriefcaseIcon>
            <span>聯絡資訊</span>
        </div>
        聯絡電話:{{ product.origin_price }}
    </div>
</div>
</template>
<script setup lang="ts">
import { BriefcaseIcon} from '@heroicons/vue/20/solid';
import BUTTON from '@/components/form/Button.vue'

const props = defineProps({
    product:{
        type:Object,
        required:true
    }
})

</script>