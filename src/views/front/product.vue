<template>
    <div class="max-w-screen-xl ms-auto p-6">
    <div class="m-4">
        <swiper
            :modules="modules"
            :pagination="{ clickable: true }"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }"
            :slides-per-view="1"
            :scrollbar="{ draggable: true }"
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
            :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <swiper-slide v-for="(item) in recommendProduct.imagesUrl" :key="item.id">
                <img 
                class="w-full h-[180px] object-cover rounded-[0.5rem]" 
                :src="item" 
                alt=""
                >
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
    <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="col-span-2">
            <div class="shadow-md rounded-md p-4 m-4 bg-white">
                <div class="text-primary-500 font-bold text-xl mb-2">
                    <i class="bi bi-building-fill"></i>
                    基本資料
                </div>
                <div class="flex justify-between">
                    <h3>近捷運古亭站全新裝潢溫馨套房(免仲介費)</h3>
                    <div class="border border-gray-500 h-[36px] w-[36px] cursor-pointer rounded-full  flex items-center justify-center">
                        <i class="bi bi-bookmark "></i>
                    </div>
                </div>
                <div>房屋性質:公寓</div>
                <div>租金:20000/月</div>
                <div>特性:信義安和六張犁台北醫學大學獨立陽台</div>
                <div>詳細資料:附近有便利商店、傳統市場、百貨公司、公園綠地、學校、醫療機構、夜市。</div>
            </div>
            <div class="shadow-md rounded-md p-4 m-4 bg-white">
                 <div class="text-primary-500 font-bold text-xl mb-2">
                        <i class="bi bi-building-fill"></i>
                        設備與規則
                </div>
                <div>
                    <i class="bi bi-calendar-event mr-2"></i>租住說明
                    <br>
                    {{ recommendProduct.tagTIME }}
                </div>
                <div>
                    <i class="bi bi-info-circle mr-2"></i>房屋守則
                    <br>
                    {{ recommendProduct.tagRULE }}
                </div>
                <div>
                    <i class="bi bi-info-circle mr-2"></i>提供設備
                    <br>
                    {{ recommendProduct.tagEQ }}
                </div>
            </div>
        </div>
        <div class="col-span-1">
            <div class="shadow-md rounded-md p-4 m-4 bg-white">
                <div class="flex items-center">
                <img 
                class=" h-[60px]"
                src="https://images.591.com.tw/index/medium/no-photo-new.png"/>
                <div>屋主: 張小姐</div>
                </div>
                <div class="bg-primary-500 p-3 rounded-md mt-2 text-white text-center cursor-pointer">聯絡資訊:<span class="ms-2">0919283493</span></div>
            </div>
            <div class="shadow-md rounded-md p-4 m-4 bg-white">
                <div class="text-primary-500 font-bold text-xl mb-2">瀏覽紀錄</div>
                <hr>
                <div>
                    <div class="mb-1 mt-1">近捷運古亭站全新裝潢溫馨套房(免仲介費)</div>
                    <div class="mb-1">租金:20000</div>
                    <hr>
                </div>
                <div>
                    <div class="mb-1 mt-1">近捷運古亭站全新裝潢溫馨套房(免仲介費)</div>
                    <div class="mb-1">租金:20000</div>
                    <hr>
                </div>
                <div>
                    <div class="mb-1 mt-1">近捷運古亭站全新裝潢溫馨套房(免仲介費)</div>
                    <div class="mb-1">租金:20000</div>
                    <hr>
                </div>
                <div>
                    <div class="mb-1 mt-1">近捷運古亭站全新裝潢溫馨套房(免仲介費)</div>
                    <div class="mb-1">租金:20000</div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/front/HomeStore';
import { CATEGORY, TAGTIME, TAGRULE, TAGEQUIMENT, TAGIMG } from '@/consts/front.const'
const homeSotre = useHomeStore();
const { hotProducts, Products, newProducts, recommendProduct } = storeToRefs(homeSotre);

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
function productsList() {
    homeSotre.getProduct().subscribe((res) => {
        if (res) {
            // Products.value = res.products
            Products.value = res.products.map((product: any) => ({
                ...product,
                tagRULE: '',
                tagEQ: '',
                tagTIME: '',
            }));
            recommend()
            homeSotre.tag()
        }
    })
}
//推薦租屋
function recommend() {
    const foundProduct = Products.value.find(product =>
        product.title === '信義安和六張犁台北醫學大學獨立陽台'
    )
    if (foundProduct) {
        recommendProduct.value = foundProduct;
        console.log(recommendProduct.value)
    }
}
onMounted(() => {
    productsList()
})
</script>
<style>
.swiper-button-prev:after,
.swiper-button-next:after {
    display: none
}
</style>