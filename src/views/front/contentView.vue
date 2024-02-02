<template>
    <div class="max-w-screen-xl mx-auto p-6 ">
        <div class="grid grid-cols-3">
            <div class="col-span-1 bg-gray-100 p-4">
                <div class="bg-white inline-block px-2 rounded"> < 返回列表 </div>
                    <div class="bg-white rounded px-2 mt-4 ">
                        <div class="my-4 flex items-center">
                            <img class="w-[70px] mr-4" src="@/assets/people.png" alt="">
                            <div>台北健身課程</div>
                        </div>
                        <hr>
                        <div class="my-4">
                            <div>我是標題</div>
                        </div>
                    </div>
                
            </div>
            <div class="col-span-2 bg-white p-4">
                <div class="text-lg text-primary-500 font-bold">聯絡房東資訊</div>
                <div>請填寫正確的資料，以便房東與你聯繫</div>
                <a href="#" @click.prevent="sendProduct()">送出訂單</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useHomeStore } from '@/stores/front/HomeStore';
const form = ref({
    user: {
          name: "test",
          email: "test@gmail.com",
          tel: "0912346768",
          address: "kaohsiung"
        }
})

const homeSotre = useHomeStore();
function getCartProduct(){
    homeSotre.getCart().subscribe((res)=>{
        if(res){
            console.log(res)
        }
    })
}
function sendProduct(){
    homeSotre.sendCart(form.value).subscribe((res)=>{
        if(res){
            console.log(res)
        }
    })
}
onMounted(()=>{
    getCartProduct()
})
</script>