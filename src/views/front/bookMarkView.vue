<template>
    <div class="bg-white">
        <div class="max-w-screen-xl mx-auto p-6 grid grid-row-2 gap-5 md:gap-10">
            <div class="grid grid-cols-1  items-center md:grid-cols-2 ">
                <div class="flex flex-col relative justify-center items-center md:justify-start md:flex-row md:items-start">
                    <img 
                    class="rounded-full border-2 w-[100px] mr-3 "
                    src="@/assets/people.png" alt="">
                    <div class="my-3 md:my-auto">
                        <span class="p-2 bg-gray-100 rounded-t-xl rounded-br-xl ">
                        "好房不等人！快快聯絡我們吧"
                        </span>
                    </div>
                </div>
                <div class="flex flex-col items-center md:items-end">
                    <div class="flex flex-row items-center  md:flex-col">
                        <div>目前收藏</div>
                        <div class="text-[20px] text-primary-500 md:text-[60px]">{{ favoriteList.length }}</div>
                    </div>
                </div>
            </div>
            <div class="flex dlex-row">
                <div 
                @click.prevent="choose('收藏')"
                :class="{ 'bg-primary-500' : isFavorite === true}"
                class="cursor-pointer mr-2  px-5 py-3 rounded-md">
                    <a  class="bi bi-bookmark-heart-fill "></a> 
                    我的收藏
                </div>
                <div 
                :class="{ 'bg-primary-500' :  iscontent === true}"
                @click.prevent="choose('聯絡')"
                class="cursor-pointer px-5 py-3 rounded-md" >
                    <i  class="bi bi-telephone-fill "></i> 
                    我聯絡過
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div v-if="isFavorite"
            class="grid grid-cols-1 gap-4 md:grid-cols-2" >
            <template  
                v-for="item in favoriteList" :key="item.id"
            >  
                <PRODUCTFAVORITE
                :productList="item"
                @toggle-favorite="toggleFavorite"
                >
                </PRODUCTFAVORITE>
            </template>
            </div> 
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useHomeStore } from '@/stores/front/HomeStore';
import PRODUCTFAVORITE from '@/components/front/ProductFavoriteCard.vue'

const homeSotre = useHomeStore()
const { favoriteList } = storeToRefs(homeSotre)
const isFavorite = ref(true);
const iscontent = ref(false);

//轉換收藏
function toggleFavorite(item:any){
    homeSotre.toggleFavorite(item)
}
function choose(item:string){
    switch(item){
        case '收藏':
        isFavorite.value = true;
        iscontent.value = false;
        break;
        case '聯絡':
        isFavorite.value = false;
        iscontent.value = true;
        break;
        default:
        isFavorite.value = true;
        iscontent.value = false;
        break;
    }
}
 function handleLinkClick(){
    console.log('111')
 }
  onMounted(()=>{
    favoriteList
   console.log(favoriteList.value)
  })
</script>