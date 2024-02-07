<template>
    <div class="max-w-screen-xl mx-auto p-6 ">
        <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="col-span-1 bg-gray-100 p-4 ">
                <div class="bg-white inline-block px-2 rounded" @click="goBack"> < 返回列表 </div>
                    <div class="bg-white rounded px-2 mt-4 h-[200px] overflow-hidden md:h-auto overflow-y-auto">
                        <div class=" flex justify-center">
                            <img class="w-[150px] m-2" :src="product.imageUrl" alt="">
                        </div>
                        <hr>
                        <div class="grid gap-2 py-2">
                            <div >
                                <div class="text-sm bg-gray-100 text-white inline-block px-2">{{ product.unit }}</div>
                            </div>
                            <div class="font-bold">{{ product.title }}</div>
                            <div><sapn class="font-bold">地區:</sapn><br>{{ product.category }}</div>
                            <div><span class="font-bold">租金:</span><br>月租${{ product.price }}</div>
                            <div><span class="font-bold">地址:</span><br>{{ product.description }}</div>
                            <div><span class="font-bold">詳細資訊:</span><br>{{ product.content }}</div>
                        </div>
                    </div>
                
            </div>
            <div class="col-span-2 bg-white p-4">
                <div class="text-lg text-primary-500 font-bold">聯絡房東資訊</div>
                <div>請填寫正確的資料，以便房東與你聯繫</div>
                <Form
                ref="formRef"
                :validation-schema="schema"
                :initial-values="initValues"
                @submit="onSubmit($event)"
                >
                <div class="form-control col-span-2 p-2">
                    <label>姓名</label>
                    <Field
                    id="name"
                    v-slot="{field,value,errorMessage}"
                    name="name" 
                    >
                        <INPUT
                        v-bind="field"
                        :placeholder="'請輸入姓名'"
                        :model-value="initValues.name = value"
                        :error-message="errorMessage"
                        :size="'m'"
                        />
                    </Field>
                </div>
                <div class="form-control col-span-2 p-2">
                    <label>信箱</label>
                    <Field
                    id="email"
                    v-slot="{field,value,errorMessage}"
                    name="email" 
                    >
                        <INPUT
                        v-bind="field"
                        :placeholder="'請輸入信箱'"
                        :model-value="initValues.email = value"
                        :error-message="errorMessage"
                        :size="'m'"
                        />
                    </Field>
                </div>
                <div class="form-control col-span-2 p-2">
                    <label>手機</label>
                    <Field
                    id="tel"
                    v-slot="{field,value,errorMessage}"
                    name="tel" 
                    >
                        <INPUT
                        v-bind="field"
                        :placeholder="'請輸入手機'"
                        :model-value="initValues.email = value"
                        :error-message="errorMessage"
                        :size="'m'"
                        />
                    </Field>
                </div>
                <div class="form-control col-span-2 p-2">
                    <label>地址</label>
                    <Field
                    id="address"
                    v-slot="{field,value,errorMessage}"
                    name="address" 
                    >
                        <INPUT
                        v-bind="field"
                        :placeholder="'請輸入地址'"
                        :model-value="initValues.address = value"
                        :error-message="errorMessage"
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
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref,reactive } from 'vue';
import { useHomeStore } from '@/stores/front/HomeStore';
import INPUT from '@/components/form/Input.vue';
import BUTTON from "@/components/form/Button.vue";
import {Field,Form} from 'vee-validate';
import { useRoute,useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// const itemId = ref({})
import * as yup from 'yup';
const product=ref({});
const homeSotre = useHomeStore();
const { itemId } = storeToRefs(homeSotre)

// 預設值
const initValues = ref({
          name: "",
          email: "",
          tel: "",
          address: ""
})
const schema = yup.object({
    name: yup.string().required('請輸入姓名'),
    email: yup.string().required('請輸入信箱').email('請輸入有效的電子信箱'),
    tel: yup.string().required('請輸入電話'),
    address: yup.string().required('請輸入地址')
})

function getCartProduct(){
    homeSotre.getCart().subscribe((res)=>{
        if(res){
            const findProduct = res.data.carts.filter((item:any)=>{
                return item.product_id ===itemId.value
            })
            console.log(findProduct,res.data.carts)
            product.value = findProduct[0].product
            console.log(product.value)
        }
    })
}
function goBack(){
    router.go(-1);
}
function onSubmit(value:any){
    const form = ref({
        user:value
    })
    console.log(form.value)
    homeSotre.sendCart(form.value).subscribe((res)=>{
        if(res){
            console.log(res)
        }
    })
}
onMounted(()=>{
    itemId.value = route.query.itemId as string;
    console.log(itemId.value)
    getCartProduct()
})
</script>