<template>
    <div class="min-w-screen-xl">
        <!-- 搜尋banner背景顏色 -->
        <div class="bg-gradient-to-r from-primary-500 to-primary-800 animate-gradient">
        <!-- 搜尋banner padding-6-->
        <div class="max-w-screen-xl  mx-auto flex flex-wrap justify-center align-center items-center p-8 ">
            <div class="text-5xl text-white ">您想住在哪裡？
                <br>
                <span class="text-3xl text-white">Find your favorite house</span>
            </div>
            <img src="@/assets/banner.svg" class="banner-pic w-[38rem]">
            <div class="w-full rounded-md bg-white  mt-[-2rem] p-4 m-2">
                <Form :validation-schema="schema"
                      :initial-values="initValues"
                      @submit="onSubmit($event)"
                      class="flex flex-col sm:flex-row items-end w-full ">
                    <div class="form-control flex flex-col items-start w-full mr-0 sm:mr-4">
                        <label>關鍵字</label>
                        <Field 
                        id="keyWord" 
                        v-slot="{ field, value, errorMessage }" 
                        name="keyWord">
                            <INPUT 
                                v-bind="field"
                                :placeholder="'請輸入關鍵字'"
                                :model-value="initValues.keyWord = value"
                                :error-message="errorMessage"
                                :size="'m'"
                                />
                        </Field>
                    </div>
                    <div class="form-control flex flex-col items-start w-full mr-0 sm:mr-4">
                        <label>地區</label>
                        <Field 
                        id="locationId" 
                        v-slot="{ field, value, errorMessage }" 
                        name="locationId">
                        <SELECT
                            :id="'locationId'"
                            v-bind="field"
                            :modelValue="value"
                            class="form-input w-full"
                            :options="rolesOptions"
                            :placeholder="'請選擇角色'"
                            :error-message="errorMessage"
                            :size="'m'"
                            /> 
                        </Field>
                    </div>
                    <Button 
                    :type="'submit'" class=" whitespace-nowrap " >搜尋餐廳</Button>
                </Form>
            </div>
        </div>
        </div>
        <!-- 熱門租屋 padding-6-->
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div class="text-xl	font-bold mt-6 mb-3 text-primary-800">熱門出租</div>
            <div class=" grid grid-cols-1 md:grid-cols-2">
                <div class="card1 ">
                    <router-link 
                    v-if="hotProducts[0]"
                    :to="`product-list/product/${hotProducts[0].id}`"
                    >
                    <HOTSTORE 
                    class=" flex-auto m-2 min-h-[150px] md:min-h-[318px] rounded-md"  
                    :sortHotStore="hotProducts[0]"
                    @toggle-favorite="toggleFavorite"
                    >
                    </HOTSTORE>
                    </router-link>
                </div>
                <div class="card2 grid grid-cols-1 md:grid-cols-2 "> 
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
                    class="min-h-[150px] m-2 rounded-md"
                      :sortHotStore="item"
                      @toggle-favorite="toggleFavorite"></HOTSTORE>
                    </router-link >
                    </template>
                </template>
                </div>
            </div>
        </div> 
        <!-- 最新租屋-->  
        <div class="max-w-screen-xl mx-auto p-6 ">
        <div class="text-xl	font-bold mt-6 mb-3 text-primary-800">最新出租</div>
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
                <router-link
                :to="`product-list/product/${item.id}`"
                >
                <GOODPRODUCT 
                class="m-2 rounded-md overflow-hidden" :sortGoodStore="item"
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
        <!--推薦租屋-->
    <div class="bg-white">
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div class="text-xl	font-bold mt-6 mb-3 text-primary-800">本週推薦出租</div>
            <div class="grid grid-cols-1 md:grid-cols-8 ">
                <div 
                    class="col-span-1 md:col-span-2  md:border-r-[0.5px] border-gray-400 space-y-2 p-4"
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
                class=" col-span-1 md:col-span-6  px-4"
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
                                    class="w-full h-[180px] object-cover rounded-[0.5rem] cursor-pointer" 
                                    :src="item" 
                                    alt=""
                                    @click.prevent="openModel(recommendProduct.imagesUrl)"
                                    >
                                </swiper-slide>        
                                <div class="swiper-button-prev swiper-custom 
                                ml-5">
                                </div>
                            </swiper>
                        </div>
                    </div>
                    <div class="mt-2 ">租屋資訊</div>
                    <div class="border-[0.5px] border-gray-400 p-4 rounded-md group cursor-pointer ">
                        <div class="grid grid-cols-2 space-y-2 ">
                            <div>
                            <div class="flex-row flex">
                                <i class="bi bi-calendar-event mr-2 group-hover:text-primary-500"></i>
                                <div class="relative overflow-hidden ">
                                    <span class="px-2 inline-block z-10">租住說明</span>
                                    <span class="absolute bg-primary-500 w-full h-full z-0 top-0 opacity-50 left-full transition-all duration-300 ease-in-out group-hover:left-0 "></span>
                                </div>
                            </div>
                            {{ recommendProduct.tagTIME }}
                        </div>
                        <div>
                            <div class="flex-row flex">
                                <i class="bi bi-info-circle mr-2 group-hover:text-primary-500"></i>
                                <div class="relative overflow-hidden ">
                                    <span class="px-2 inline-block z-10">房屋守則</span>
                                    <span class="absolute bg-primary-500 w-full h-full z-0 top-0 opacity-50 left-full transition-all duration-300 ease-in-out group-hover:left-0 "></span>
                                </div>
                            </div>
                            {{ recommendProduct.tagRULE }}
                        </div>
                        </div>
                        
                        <div>
                            <div class="flex-row flex">
                                <i class="bi bi-info-circle mr-2 group-hover:text-primary-500"></i>
                                <div class="relative overflow-hidden ">
                                    <span class="px-2 inline-block z-10">提供設備</span>
                                    <span class="absolute bg-primary-500 w-full h-full z-0 top-0 opacity-50 left-full transition-all duration-300 ease-in-out group-hover:left-0 "></span>
                                </div>
                            </div>
                            {{ recommendProduct.tagEQ }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!--租屋類型categoty-->
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div class="text-xl	font-bold mt-6 mb-3 text-primary-800">熱門租房類型</div>
            <div class="grid grid-cols-1 md:grid-cols-2 text-white">
                
                <template 
                v-for="(item,index) in ['ONE', 'SECAND', 'THREE', 'FOUR']" :key="item"
                >
                <router-link
                :class="index===0 ? 'bg-primary-500':'bg-gray-400'"
                class=" m-2 p-4 rounded-md cursor-pointer hover:bg-primary-500 group"
                :to="`category/${item}`"
                >
                    <div class="text-2xl">{{ CATEGORY[item] }}</div>
                    <div class="grid grid-cols-1 items-center sm:grid-cols-3">
                        <div class="flex justify-center">
                            <img 
                                :src="index===0 ? TAGIMG[item]: NOTTAGIMG[item]"
                                class="col-span-1 p-2 h-[120px]"
                            >
                            </div>
                        <div class="col-span-2">
                            <template v-for="obj in [TAGTIME, TAGRULE, TAGEQUIMENT]" :key="obj">
                                <i class="bi bi-info-circle mr-2"></i>{{ obj[item] }}<br> 
                            </template>
                        </div>
                        
                    </div>
                    <div class="mt-5">查看更多房子
                        <span class="transition-all duration-300 rounded-full border border-white px-1.5 py-0.5 group-hover:translate-x-2 inline-block">&#8594;</span>
                    </div>
                </router-link>
                </template>
            </div>  
        </div>
    </div>
        <!--合作企業-->
        <div class="max-w-screen-xl mx-auto p-6 ">
            <div
            class="p-2 relative banner">
                <img 
                class="w-full h-[200px] rounded-md hidden md:block"
                src="@/assets/home-banner.svg" alt="">
                <img 
                class="w-full h-[200px] rounded-md block md:hidden"
                src="@/assets/home-banner-md.svg" alt="">
            </div>
            <div class="text-center mt-3">
                <div class="text-xl	font-bold mt-10 mb-3 text-primary-800">優質合作企業</div>
                <!--上面這一段-->
                <div class="grid grid-cols-2 items-center md:grid-cols-6 gap-5 mt-5">
                    <div class="bg-white  rounded-md h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-1.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="bg-white  rounded-md h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-2.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="bg-white  rounded-md h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-3.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="bg-white  rounded-md h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-4.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="bg-white  rounded-md h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-5.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="bg-white  rounded-md h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-6.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                    <div class="bg-white  rounded-md h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-7.svg" alt="" class="w-[100px] mx-auto my-auto">
                    </div>
                    <div class="bg-white  rounded-md h-[100px] flex items-center justify-center">
                    <img src="@/assets/logo/logo-8.svg" alt="" class="w-[150px] mx-auto my-auto">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <PRODUCTIMG ref="productImg" :getImgs="getImgs"></PRODUCTIMG>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Field, Form } from 'vee-validate';
import INPUT from '@/components/form/Input.vue'
import Button from "@/components/form/Button.vue";
import HOTSTORE from '@/components/front/HotStore.vue';
import GOODPRODUCT from '@/components/front/GoodProduct.vue';
import { useHomeStore } from '@/stores/front/HomeStore';
import { onMounted, ref } from 'vue';
import { CATEGORY, TAGTIME, TAGRULE, TAGEQUIMENT, TAGIMG, NOTTAGIMG} from '@/consts/front.const'
import SELECT from '@/components/form/Select.vue';
import * as yup from 'yup';
import PRODUCTIMG from '@/components/front/ProductImg.vue'

import { useRouter, Router } from 'vue-router';
const router: Router = useRouter();
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
const { hotProducts, Products, newProducts, recommendProduct,favoriteList,rolesOptions } = storeToRefs(homeSotre)
function productsList() {
    homeSotre.getProduct().subscribe((res) => {
        if (res) {
            Products.value = res.products
            // Products.value = res.products.map((product: any) => ({
            //     ...product
            // }
            // ));
            //tag一定要在前面才能先抓到tag資訊並判斷sortHotProducts,newProduct,recommend
            homeSotre.tag()
            sortHotProducts()
            newProduct()
            recommend()
            console.log(hotProducts.value)
        }
    })
}
//swiper
const onSwiper = (swiper:any) => {
};
const onSlideChange = () => {
};
// 預設值
  const initValues = ref({
    keyWord:"",
    locationId: ""
  })
  const schema = yup.object({
})
function onSubmit(value:any){
    router.push({
    path: '/search',
    query: { data: JSON.stringify(value) }  // 使用 JSON.stringify 將物件轉為字串
  });    
  console.log(value)
}
//熱門產品
function sortHotProducts() {
    if (Products.value.length > 0) {
        const temHot = Products.value.filter((item: any) => item.unit === "透天")
        const arr = new Set<number>([]); //放隨機數
        if (temHot.length < 6) {
            hotProducts.value = Products.value.map(item=>{
                let foundFavorite = favoriteList.value.find((favorite:any)=>favorite.id == item.id);
                return {...item, isFavorite:foundFavorite?true : false}
            })
            console.log(hotProducts.value)
        }
        else {
            const temHotProduct: any[] = [];
            for (let index = 0; arr.size < 6; index += 1) {
                const num = Math.floor(Math.random() * temHot.length)
                arr.add(num)
            }
            //過濾所有product找到有對應favorieList的並放入hotProducts陣列中
            arr.forEach((i) => {
                let foundFavorite = favoriteList.value.find((favorite:any)=>favorite.id == temHot[i].id);
                temHotProduct.push({...temHot[i], isFavorite: foundFavorite ? true : false})
            });
            hotProducts.value = temHotProduct
            console.log(hotProducts.value)
        }
    }
}
function toggleFavorite(item:any){
    homeSotre.toggleFavorite(item)
}
//最新餐廳
function newProduct() {
    const temNewArray: any[] = [];
    if (Products.value.length > 0) {
        for (let index = 0; index < 6 && index < Products.value.length; index += 1){
            let foundFavorite = favoriteList.value.find((favorite:any)=>favorite.id == Products.value[index].id)
            console.log(foundFavorite)
            temNewArray.push({...Products.value[index],isFavorite:foundFavorite? true:false})
        }
        newProducts.value = temNewArray
    }
}
//推薦租屋
function recommend() {
    const foundProduct = Products.value.find(product => 
        product.title === '台北全新透天'
    )
    if (foundProduct) {
        recommendProduct.value = foundProduct;
        console.log('111',recommendProduct.value)
    }
}
const productImg= ref(null);
const getImgs = ref([])
//打開子元件照片牆
function openModel(product:any){
    if (productImg.value !== null) {
        getImgs.value=product
        productImg.value.showModel();
    }
}

onMounted(() => {
    productsList()
    newProduct()
    console.log('測試')
})
</script>
<style>
.swiper-button-prev:after, .swiper-button-next:after{
    display:none
}
.favoriteClass{
    background-color: red;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradientAnimation 4s infinite;
  background-size: 200% 200%;
}
</style>