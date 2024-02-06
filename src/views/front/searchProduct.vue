<template>
<div class="max-w-screen-xl mx-auto p-6">
    <div class="bg-white rounded-md p-4 flex items-center flex-wrap">
    <div class="w-full">搜尋條件</div>
    <Form 
    class="flex items-end grid grid-cols-1 md:grid-cols-5 w-full"
    ref="formRef"
    :validation-schema="schema"
    :initial-values="initValues"
    @submit="onSubmit($event)"
    >
    <div class="form-control col-span-2 p-2">
        <label>關鍵字</label>
        <Field
        id="keyWord"
        v-slot="{field,value,errorMessage}"
        name="keyWord" 
        >
            <INPUT
            v-bind="field"
            :placeholder="'請輸入關鍵字'"
            :model-value="initValues.keyWord = value"
            :error-message="errorMessage"
            :size="'m'"
            />
        </Field>
    </div>
    <div class="form-control col-span-2 p-2">
        <label>地區</label>
        <Field
        v-slot="{field,value,errorMessage}"
        name="locationId"
        >
        <SELECT
        :id="'locationId'"
        v-bind="field"
        :modelValue="value"
        class="form-input"
        :options="rolesOptions"
        :placeholder="'請選擇角色'"
        :error-message="errorMessage"
        @update:model-value="handleSelectChange"
        :size="'m'"
        /> 
        </Field> 
    </div>
    <div class="col-span-1 p-2 flex">
    <BUTTON 
    :outline="true" 
    :type="'button'"
    :size="'m'"
    class="mr-1 w-1/2"
    >取消</BUTTON>
    <BUTTON 
    :type="'submit'"
    class="w-1/2"
    :size="'m'"
    >確認</BUTTON>
    </div>
    </Form>
    </div>
    <BREADCRUMBS></BREADCRUMBS>
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="col-span-1 mr-2 ">
            <span v-for="product in newProduct" :key="product.id">
            <PRODUCTCARD 
            :class="{
                'border-l-4 border-primary-500':isSelectedProduct(product)
            }"
            :productList="product" @toggle-favorite="toggleFavorite" @selectProduct="selectProduct"></PRODUCTCARD>
            </span>
        </div>
        <div  class="hidden md:block col-span-1 sticky top-4 h-[52rem] overflow-y-auto mt-4 rounded-md">
            <PRODUCTDETAILCARD v-if="selected" :product="selected" @openModel="openModel" @addToCart="addToCard"></PRODUCTDETAILCARD>
        </div>
        <div v-if="newProduct.length === 0" class="absolute pt-10 w-full flex justify-center text-xl">
            <i class="bi bi-search mr-2 "></i>
            <div>沒有搜尋到商品</div>
        </div>
    </div>
    <PRODUCTIMG ref="productImg" :getImgs="getImgs"></PRODUCTIMG>
    <!-- <div v-for="product in newProduct" :key="product.id">{{ product.title }}</div> -->
</div>
</template>
<script setup lang="ts">
import { computed, defineComponent, onMounted, ref ,toRefs,watch } from 'vue';
import { storeToRefs } from 'pinia';
import INPUT from '@/components/form/Input.vue';
import BUTTON from "@/components/form/Button.vue";
import SELECT from '@/components/form/Select.vue';
import { useHomeStore } from '@/stores/front/HomeStore';
import {Field,Form} from 'vee-validate';
import * as yup from 'yup';
import PRODUCTCARD from '@/components/front/ProductListCard.vue'
import PRODUCTDETAILCARD from '@/components/front/productDetailCard.vue'
import PRODUCTIMG from '@/components/front/ProductImg.vue'
import BREADCRUMBS from '@/components/breadCrumbs.vue'
import { useRoute,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
  // 預設值
const initValues = ref({
    keyWord:"",
    locationId: ""
  })
const schema = yup.object({
})
const homeSotre = useHomeStore()
const {  Products,favoriteList,rolesOptions } = storeToRefs(homeSotre)
const newProduct = ref([]);
const selected = ref({});


function onSubmit(value:any){
    if(value.locationId === '' && value.keyWord === ''){
        newProduct.value=Products.value
        selected.value=newProduct.value[0]
    }
    else if (value.locationId !== '' && value.keyWord === ''){
        newProduct.value = Products.value.filter((item:any)=>{
        return item.category === value.locationId
        })
        selected.value=newProduct.value[0]
    }
    else if (value.keyWord !== '' && value.locationId === '') {
        newProduct.value = Products.value.filter((item:any)=>{
         return item.title.includes(value.keyWord)
        })
        selected.value=newProduct.value[0]
    }else if (value.keyWord !== '' && value.locationId !== ''){
        newProduct.value = Products.value.filter((item:any)=>{
         return item.title.includes(value.keyWord)&&item.category === value.locationId
        })
        selected.value=newProduct.value[0]
    }

    console.log(newProduct.value)
}

//取的所有資料
function productsList() {
    homeSotre.getProduct().subscribe((res) => {
        if (res) {
            //過濾所有product在favorieList內的都要加上isFavorite:true
            Products.value = res.products.map((product: any) => {
                let foundFavorite = favoriteList.value.some((favorite: any) => favorite.id === product.id);
                return { ...product, isFavorite: foundFavorite };
            });
            homeSotre.tag()
            console.log(searchData.value)
            //判斷是不是從首頁來的搜尋商品
            //Object.keys(searchData.value).length!==0 判斷這個物件的屬性是不是空
            if(Object.keys(searchData.value).length!==0 ){
                onSubmit(searchData.value)
                console.log(newProduct.value)
            }
            else{
                console.log('2')
                newProduct.value = Products.value
                selected.value=newProduct.value[0]
                // selected.value = newProduct.value[0]
            }
            console.log(newProduct.value)
        }
        console.log(Products.value); 
    });
}
//點擊product看詳情
function selectProduct(item:any){
    const windowWidth = window.innerWidth;
    if(windowWidth > 768){
        selected.value =item
        console.log(selected.value)
    }else{
        router.push(`/product-list/product/${item.id}`);
    }
}

//轉換收藏
function toggleFavorite(item:any){
    homeSotre.toggleFavorite(item)
}
//判斷是否是當前selectProduct
function isSelectedProduct(product:any) {
    return selected.value === product;
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
//加入購物車
function addToCard(item:any){
    homeSotre.addCart(item.id).subscribe((res)=>{
       if(res){
        console.log(res)
        router.push('/content')
       }
    })
}
const searchData=ref({})

onMounted(() => {
    productsList()
    console.log(favoriteList.value)
    console.log(route,router)
    const queryParams =  router.currentRoute.value.query;
    if ('data' in queryParams) {
    // 解析 'data' 查詢參數並設置到 searchData
    searchData.value = JSON.parse(queryParams.data);
    console.log(searchData.value)
  }
})
</script>