<template>
    <div class="max-w-screen-xl ms-auto p-6 mx-auto">
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
            <swiper-slide v-for="(item) in detailProduct.imagesUrl" :key="item.id">
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
                    <h3>{{ detailProduct.title }}</h3>
                     <div class="cursor-pointer">
                        <i 
                        @click.prevent = toggleFavorite(detailProduct)
                        class="bi border border-primary-500 text-primary-500 p-2 rounded-full"
                        :class="[detailProduct.isFavorite? 'bi-bookmark-fill': 'bi-bookmark']"
                        ></i> 
                    </div> 
                </div>
                <div>房屋性質:{{ detailProduct.unit }}</div>
                <div>租金:{{ detailProduct.price }}</div>
                <div>特性:{{ detailProduct.content }}</div>
                <div>詳細資料:{{ detailProduct.description }}</div>
            </div>
            <div class="shadow-md rounded-md p-4 m-4 bg-white">
                 <div class="text-primary-500 font-bold text-xl mb-2">
                        <i class="bi bi-building-fill"></i>
                        設備與規則
                </div>
                <div>
                    <i class="bi bi-calendar-event mr-2"></i>租住說明
                    <br>
                    {{ detailProduct.tagTIME }}
                </div>
                <div>
                    <i class="bi bi-info-circle mr-2"></i>房屋守則
                    <br>
                    {{ detailProduct.tagRULE }}
                </div>
                <div>
                    <i class="bi bi-info-circle mr-2"></i>提供設備
                    <br>
                    {{ detailProduct.tagEQ }}
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
                <div
                    @click.prevent="addToCard(detailProduct)"
                    class="cursor-pointer bg-primary-500 p-3 rounded-md mt-2 text-white text-center cursor-pointer">
                    聯絡資訊:
                    <span class="ms-2">{{ detailProduct.origin_price }}</span>
                </div>
            </div>
            <div class="shadow-md rounded-md p-4 m-4 bg-white">
                <div class="text-primary-500 font-bold text-xl mb-2">瀏覽紀錄</div>
                <hr>
                <router-link 
                    class=" hover:text-primary-500 active:text-primary-500"
                    v-for="(product,index) in record" :key="index"
                    :to="`/product-list/product/${product.id}`"
                    >
                <RECORD :recordProduct="product" 
                ></RECORD>
                </router-link>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/front/HomeStore';
import RECORD from '@/components/front/Record.vue';

const homeSotre = useHomeStore();
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRoute,useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay];
const { detailProduct,favoriteList,record,Products } = storeToRefs(homeSotre)

//swiper
const onSwiper = (swiper: any) => {
};
const onSlideChange = () => {
};
// const { id } = toRefs(route.params);
const reactiveParams = reactive(route.params);
const { id } = toRefs(reactiveParams);

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
            homeSotre.tag()
        }
    })
}
//toggle 我的最愛
function toggleFavorite(item:any){
    homeSotre.toggleFavorite(item)
}
//取得產品
function product() {
    homeSotre.getDetailProduct(id.value).subscribe((res) => {
        if (res) {
            let findFavorite = favoriteList.value.find((item:any)=>{
                return item.id == res.product.id
            })
            console.log(findFavorite)
            if(findFavorite){
                detailProduct.value={
                    ...findFavorite,
                }
            }
            else{
            detailProduct.value = {
                ...res.product,
            }}
            homeSotre.detailTag()
            console.log(detailProduct.value)
            getRecord(detailProduct.value)
        }
    })
}
function getRecord(product:any) {
    const findSameIndex = record.value.findIndex((item:any)=>{
        return item.id == product.id
    })
    if(findSameIndex!== -1){
        //找到相同的產品移除舊產品
        record.value.splice(findSameIndex, 1);
    }
    if(record.value.length>=6){
        //大於六項產品刪除最後一項
        record.value.pop()
    }
    //將新產品移到開頭
    record.value.unshift(product);
    sessionStorage.setItem('getRecord',JSON.stringify(record.value))
    console.log(record.value)
}
//加入購物車
function addToCard(item:any){
    homeSotre.addCart(item.id).subscribe((res)=>{
       if(res){
        console.log(res)
        router.push({path: '/content', query:{itemId:item.id}})
       }
    })
}
//監看路由變化
watch(
  () => route,
  () => {
    window.location.reload(); // 重新加载整个页面
  },
  { deep: true } // 使用 deep 选项进行深度监听
)

onMounted(() => {
    productsList(),
    product()
})
</script>
<style>
.swiper-button-prev:after,
.swiper-button-next:after {
    display: none
}
</style>