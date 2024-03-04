<template>
     <!--商品分類-->
    <div class="bg-primary-200 text-center">
        <div class="max-w-screen-xl mx-auto p-6 py-10 ">
            <div class="text-xl text-primary-800 font-bold ">商品類別</div>
            <ul class="flex items-center w-full justify-center my-10 cursor-pointer">
                <template v-for="item in CATEGORY" :key="item">
                    <li
                    @click.prevent="chooseCategory(item)"
                    :class="{'bg-primary-800 text-white': selectedCategory === item}"
                    class="px-4 rounded"
                    >{{ item }}
                    </li>
                </template>
            </ul>
        <hr class="border-gray-300">
        <div>
            <div class="text-xl text-primary-800 font-bold my-10">最近熱門</div>
            <div>
                <swiper
                    :modules="modules"
                    :navigation="{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }"
                    :pagination="{ clickable: true }"
                    :autoplay="{
                        delay: 2500,
                        disableOnInteraction: false,
                    }"
                    :breakpoints="{

                        320: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        800: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        1100: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        }
                    }"
                    @swiper="onSwiper"
                    @slideChange="onSlideChange"
                    >
                        <swiper-slide v-for="(item) in Products" :key="item.id">
                            <router-link
                            :to="`/product-list/product/${item.id}`"
                            >
                            <GOODPRODUCT 
                            class=" rounded overflow-hidden" :sortGoodStore="item"
                            @toggle-favorite="toggleFavorite"
                            ></GOODPRODUCT>
                            </router-link>
                        </swiper-slide>        
                        <div class="swiper-button-prev swiper-custom 
                            ml-5">
                            <button type="button" class="btn btn-sm rounded-circle iconBtnBox p-2  border  border-white rounded-full">
                                <i class="bi bi-arrow-left actionIcon text-md text-white"></i>
                            </button>
                        </div>
                        <div class="swiper-button-next swiper-custom 
                        mr-5">
                            <button type="button" class="btn btn-sm rounded-circle iconBtnBox p-2  border  border-white rounded-full">
                                <i class="bi bi-arrow-right actionIcon text-md text-white"></i>
                            </button>
                        </div>
                </swiper>
            </div>
        </div>
        </div>
    </div>
    <!--商品資訊-->
    <div class="bg-gray-100">
    <div class="max-w-screen-xl mx-auto p-6">
        <div class="mb-4" v-if="tag">
            <span class="bg-gray-300 px-2 py-1 rounded mr-2">{{ tag.tagTime }}</span>
            <span class="bg-gray-300 px-2 py-1 rounded">{{ tag.tagRule }}</span>
        </div>
        <GATEGORYCARD :product="Products"></GATEGORYCARD>
    </div>
    </div>
     <!--商品類別-->
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div class="text-xl font-bold">更多類別</div>
            <div class="w-full grid grid-cols-2 gap-5 md:grid-cols-5 mt-3">
                <template v-for="item in CATEGORY" :key="item">
                <a href="#" 
                    @click.prevent="chooseCategory(item)" 
                    class=" h-[100px] rounded relative flex items-center justify-center md:h-[130px]">
                    <div class="absolute z-100 font-bold">{{ item }}</div>
                    <div class="bg-no-repeat bg-cover rounded-md bg-center absolute h-full w-full opacity-30 -z-1 hover:opacity-50" :style="{ backgroundImage: getCategoryBackground(item) }"></div>
                </a>
                </template>
            </div>
        </div>
</template>
<script setup lang="ts">
import { onMounted, ref, toRefs, reactive, watch,watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/front/HomeStore';
const homeSotre = useHomeStore();
const {  Products,favoriteList } = storeToRefs(homeSotre)
import GOODPRODUCT from '@/components/front/GoodProduct.vue';
import GATEGORYCARD from '@/components/front/categoryProduct.vue'
import { CATEGORY,TAGTIME,TAGRULE} from '@/consts/front.const'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay];
//swiper
const onSwiper = (swiper: any) => {
};
const onSlideChange = () => {
};
const allProduct = ref([])
const selectedCategory = ref(null);
function getCategoryBackground(item:string) {
  switch (item) {
    case '公寓':
    return 'url(/src/assets/class-apartment.svg)';
    case '電梯大樓':
    return 'url(/src/assets/class-building.svg)';
    case '透天':
    return 'url(/src/assets/class-house.svg)';
    case '別墅':
    return 'url(/src/assets/class-villa.svg)';
    case '全部':
      return 'url(/src/assets/class-all.svg)';
    default:
      return 'url(/src/assets/category_pic.svg)';
  }
}
function product(){
    homeSotre.getProduct().subscribe((res)=>{
        if(res){
            allProduct.value = res.products
            if(category){
                Products.value=res.products.filter((item:any)=>{
                    return item.unit == CATEGORY[category]
                })
                console.log(Products.value)
            }
            else{
                Products.value=res.products
            }
        //    Products.value=res.products
        }
        homeSotre.tag()
        console.log(Products.value)
    })
}
//選擇 category
function chooseCategory(item:any){
    selectedCategory.value = item
    console.log(selectedCategory.value)
    if(item!== '全部'){
        Products.value= allProduct.value.filter((product)=>{
        return product.unit === item
    }) 
    }
    else{
        Products.value=allProduct.value
    }
}
function toggleFavorite(item:any){
    homeSotre.toggleFavorite(item)
}
//判斷屬性tag
const tag = ref(null);
function getTagTime(category: any) {
    switch (category) {
        case CATEGORY.ONE:
            return {tagTime:TAGTIME.ONE,tagRule:TAGRULE.ONE};
        case CATEGORY.SECAND:
            return {tagTime:TAGTIME.SECAND,tagRule:TAGRULE.SECAND};
        case CATEGORY.THREE:
            return {tagTime:TAGTIME.THREE,tagRule:TAGRULE.THREE};
        case CATEGORY.FOUR:
            return {tagTime:TAGTIME.FOUR,tagRule:TAGRULE.FOUR};
    }
}
//監看tag變化immediate 第一次也要判斷
watch(selectedCategory,(newCategory)=>{
        tag.value = getTagTime(newCategory)
    }, { immediate: true })

//取得路由參數
import {useRoute} from 'vue-router'
const route = useRoute();
const category = route.params.id
//監看路由變化
watch(
  () => route,
  () => {
    window.location.reload(); // 重新加载整个页面
  },
  { deep: true } // 使用 deep 选项进行深度监听
)
//分類間變色
const colors= ref(['bg-primary-500','bg-primary-200','bg-primary-100','bg-primary-800'])
function getRandomColor() {
      return colors.value[Math.floor(Math.random() * colors.value.length)];
    }
onMounted(()=>{
    selectedCategory.value = CATEGORY[category]
    console.log( selectedCategory.value)
    product()
    // 使用 watchEffect 監看 selectedCategory 的變化
    
})
</script>
<style>
.swiper-button-prev:after, .swiper-button-next:after{
    display:none
}
.favoriteClass{
    background-color: red;
}
.categotyONE::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/category_pic.svg'); /* 使用相对路径 */
  opacity: 0.3;
  
}
.categotySECAND::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/category_pic.svg'); /* 使用相对路径 */
  opacity: 0.3;
  
}
.categotyTHREE::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/category_pic.svg'); /* 使用相对路径 */
  opacity: 0.3;
  
}
.categotyFOUR::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/category_pic.svg'); /* 使用相对路径 */
  opacity: 0.3;
  
}
.categotyFIVE::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/category_pic.svg'); /* 使用相对路径 */
  opacity: 0.3;
  
}
</style>