<template>
    <div class="min-w-screen-xl">
        <!-- 搜尋banner背景顏色 -->
        <div class="bg-primary-500">
        <!-- 搜尋banner padding-6-->
        <div class="max-w-screen-xl  mx-auto flex flex-wrap justify-center align-center items-center p-6 ">
            <div class="text-5xl">立即搜尋早餐
                <br>
                Got Youself A Fine Job !
            </div>
            <img src="@/assets/banner.png" class="banner-pic w-[32rem]">
            <div class="w-full  bg-white border-primary-500 border mt-[-6rem] p-4 m-2">
                <Form :validation-schema="schema"
                      :initial-values="initValues"
                      @submit="onSubmit($event)"
                      class="flex flex-col sm:flex-row items-end w-full">
                    <div class="form-control flex flex-col items-start w-full mr-0 sm:mr-4">
                        <label>關鍵字</label>
                        <Field 
                        id="keyWord" 
                        v-slot="{ field, value, errorMessage }" 
                        name="keyWord">
                            <INPUT 
                                v-bind="field"
                                />
                        </Field>
                    </div>
                    <div class="form-control flex flex-col items-start w-full mr-0 sm:mr-4">
                        <label>地區</label>
                        <Field 
                        id="keyWord" 
                        v-slot="{ field, value, errorMessage }" 
                        name="keyWord">
                            <INPUT 
                                v-bind="field"
                                />
                        </Field>
                    </div>
                    <Button :type="'button'" class=" whitespace-nowrap " >搜尋餐廳</Button>
                </Form>
            </div>
        </div>
        </div>
        <!-- 熱門租屋 padding-6-->
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div class="text-xl	font-bold">熱門出租</div>
            <div class=" grid grid-cols-1 md:grid-cols-2">
                <div class="card1 ">
                    <router-link 
                    v-if="hotProducts[0]"
                    :to="`product-list/product/${hotProducts[0].id}`"
                    >
                    <HOTSTORE class=" flex-auto m-2 min-h-[150px] md:min-h-[318px]"  :sortHotStore="hotProducts[0]"></HOTSTORE>
                    </router-link>
                </div>
                <div class="card2 grid grid-cols-1 md:grid-cols-2"> 
                   <template 
                    v-for="(item, index) in hotProducts" 
                    :key="item.id"
                    >
                    <template
                     v-if="index >= 1 && index <= 4">
                    
                    <router-link 
                    :to="`product-list/product/${item.id}`"
                    class=""
                    >
                    <HOTSTORE  
                    class="min-h-[150px] m-2"
                      :sortHotStore="item"></HOTSTORE>
                    </router-link >
                    </template>
                </template>
                </div>
            </div>
        </div> 
        <!-- 最新租屋-->  
        <div class="max-w-screen-xl mx-auto p-6 ">
        <div class="text-xl	font-bold">最新出租</div>
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
            <swiper-slide v-for="(item) in newProducts" :key="item.id">
                <GOODPRODUCT class="m-2 rounded overflow-hidden" :sortGoodStore="item"></GOODPRODUCT>
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
        <!--推薦租屋-->
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div class="text-xl	font-bold">本週推薦出租</div>
            <div class="grid grid-cols-1 md:grid-cols-5 m-2">
                <div 
                    class="col-span-1 md:col-span-2  md:border-r-2 border-primary-500 mr-2 space-y-2"
                    >
                    <div>
                        <img
                            :src="recommendProduct.imageUrl" 
                            alt=""
                            class="w-[150px] h-[80px] mt-2"
                        >
                    </div>
                    <div>
                        {{ recommendProduct.title }}
                    </div>
                    <div>
                        <i class="bi bi-house-door"></i>{{ recommendProduct.unit }}
                    </div>
                    <div>
                        <i class="bi bi-geo-alt"></i>{{ recommendProduct.description }}
                    </div>
                    <button>查看完整出屋資訊</button>
                </div>
                <div 
                class="  col-span-1 md:col-span-3"
                >
                    <div>租屋簡介</div>
                    <div class="grid grid-cols-1 md:grid-cols-5  mb-2 mt-2">
                        <div class="  col-span-1 md:col-span-2 mr-2">
                            {{  recommendProduct.content  }}
                        </div>
                        <div class="col-span-1 md:col-span-3">
                            <swiper
                                :modules="modules"
                                :pagination="{ clickable: true }"
                                :autoplay="{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }"
                                :slides-per-view="1"
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
                                </div>
                            </swiper>
                        </div>
                    </div>
                    <div class="mt-2">租屋資訊</div>
                    <div class="grid grid-cols-2 space-y-2 mt-2">
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
                    </div>
                    <div>
                        <i class="bi bi-info-circle mr-2"></i>提供設備
                        <br>
                        {{ recommendProduct.tagEQ }}
                    </div>
                </div>
            </div>
        </div>
        <!--租屋類型categoty-->
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div class="text-xl	font-bold">熱門租房類型</div>
            <div class="grid grid-cols-1 md:grid-cols-2 text-white">
                <div 
                class="bg-primary-500 m-2 p-4 rounded-md"
                v-for="item in ['ONE', 'SECAND', 'THREE', 'FOUR']" :key="item"
                >
                    <div class="text-2xl">{{ CATEGORY[item] }}</div>
                    <div class="grid grid-cols-1 items-center sm:grid-cols-3">
                        <div>
                                <img 
                                :src='TAGIMG[item]'
                                class="col-span-1">
                            </div>
                        <div class="col-span-2">
                            <template v-for="obj in [TAGTIME, TAGRULE, TAGEQUIMENT]" :key="obj">
                                <i class="bi bi-info-circle mr-2"></i>{{ obj[item] }}<br> 
                            </template>
                        </div>
                        
                    </div>
                    <div class="mt-5">查看更多房子
                        <span class="rounded-full border px-1 py-0.5  ">&#8594;</span>
                    </div>
                </div>
            </div>  
        </div>
        <!--合作企業-->
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div
            class="p-2 relative banner">
                <img 
                class="w-full h-[200px] "
                src="https://img.tukuppt.com/bg_grid/00/03/29/BMuPp0QzDQ.jpg!/fh/350" alt="">
                <button class="absolute left-[30px] top-[170px] text-white">聯絡我們 <span class="rounded-full border px-1 py-0.5  ">&#8594;</span></button>
            </div>
            <div class="text-center mt-3">
                <div class="text-xl	font-bold">優質合作企業</div>
                <!--上面這一段-->
                <div class="grid grid-cols-2 items-center md:grid-cols-4">
                    <div class="m-2 border border-primary-500 h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-1.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="m-2 border border-primary-500 h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-2.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="m-2 border border-primary-500 h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-3.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="m-2 border border-primary-500 h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-4.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="m-2 border border-primary-500 h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-5.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="m-2 border border-primary-500 h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-6.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="m-2 border border-primary-500 h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-7.svg" alt="" class="w-[100px] mx-auto my-auto">
                    </div>
                    <div class="m-2 border border-primary-500 h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-8.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Field, Form } from 'vee-validate';
import INPUT from '@/components/form/Input.vue'
import Button from "@/components/form/Button.vue";
import HOTSTORE from '@/components/HotStore.vue';
import GOODPRODUCT from '@/components/GoodProduct.vue';
import { useHomeStore } from '@/stores/front/HomeStore';
import { onMounted, ref } from 'vue';
import { CATEGORY, TAGTIME, TAGRULE, TAGEQUIMENT, TAGIMG } from '@/consts/front.const'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y , Autoplay } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay];

const homeSotre = useHomeStore()
const { hotProducts, Products, newProducts, recommendProduct } = storeToRefs(homeSotre)
function productsList() {
    homeSotre.getProduct().subscribe((res) => {
        if (res) {
            // Products.value = res.products
            Products.value = res.products.map((product: any) => ({
                ...product,
                tagRULE: '',
                tagEQ: '',
                tagTIME: ''
            }));
            console.log(Products.value)
            sortHotProducts()
            newProduct()
            recommend()
            homeSotre.tag()
        }
    })
}
//swiper
const onSwiper = (swiper:any) => {
};
const onSlideChange = () => {
};
//熱門產品
function sortHotProducts() {
    if (Products.value.length > 0) {
        const temHot = Products.value.filter((item: any) => item.unit === "透天")
        const arr = new Set<number>([]); //放隨機數
        if (temHot.length < 6) {
            hotProducts.value = Products.value
            console.log(Products.value)
        }
        else {
            const temHotProduct: any[] = [];
            for (let index = 0; arr.size < 6; index += 1) {
                const num = Math.floor(Math.random() * temHot.length)
                arr.add(num)
            }
            arr.forEach((i) => {
                temHotProduct.push(temHot[i])
            });
            hotProducts.value = temHotProduct
            console.log(hotProducts.value)
        }
    }
}
//最新餐廳
function newProduct() {
    const temNewArray: any[] = [];
    if (Products.value.length > 0) {
        for (let index = 0; index < 6; index += 1){
            temNewArray.push(Products.value[index])
        }
        newProducts.value = temNewArray
    }
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

//判斷租屋tag


onMounted(() => {
    productsList()
})
</script>
<style>
.swiper-button-prev:after, .swiper-button-next:after{
    display:none
}

</style>