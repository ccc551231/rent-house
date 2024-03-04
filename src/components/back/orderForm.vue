<template>
    <div class="modal-mask">
        <div class="modal-container rounded-lg dark:bg-gray-700 w-4/5 max-w-screen-md px-3 py-3 mx-auto  overflow-y-auto">
            <div class="modal-header flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 ">
                         {{formTitle}}產品
                    </h3>
                    <button type="button" @click="cancelClick" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
            </div>
            <div class="modal-body p-4 md:p-5">
                <Form
                :validation-schema="schema"
                :initial-values="initValues"
                @submit="onSubmit($event)"
                >
                <div class="grid grid-cols-1  gap-y-6 gap-x-10">
                    <div class="form-control flex flex-col items-start">
                        <label>使用者名稱</label>
                        <Field
                        id="name"
                        v-slot="{field , value , errorMessage}"
                        name="name"
                        >
                        <INPUT 
                        v-bind="field" 
                        :model-value="initValues.name = value"
                        :error-message="errorMessage"
                        />
                    </Field>
                    </div>

                    <div class="form-control flex flex-col items-start">
                        <label>使用者電話</label>
                        <Field
                        id="tel"
                        v-slot="{field , value , errorMessage}"
                        name="tel"
                        >
                        <INPUT 
                        v-bind="field" 
                        :model-value="initValues.tel = value"
                        :error-message="errorMessage"
                        />
                    </Field>
                    </div>

                    <div class="form-control flex flex-col items-start">
                        <label>使用者信箱</label>
                        <Field
                        id="email"
                        v-slot="{field , value , errorMessage}"
                        name="email"
                        >
                        <INPUT 
                        v-bind="field" 
                        :model-value="initValues.email = value"
                        :error-message="errorMessage"
                        />
                    </Field>
                    </div>

                    <div class="form-control flex flex-col items-start">
                        <label>使用者地址</label>
                        <Field
                        id="address"
                        v-slot="{field , value , errorMessage}"
                        name="address"
                        >
                        <INPUT 
                        v-bind="field" 
                        :model-value="initValues.address = value"
                        :error-message="errorMessage"
                        />
                    </Field>
                    </div>
                </div>
                <div class="pt-8 show-modal-button w-full flex justify-center">
                    <BUTTON :type="'button'" :outline="true" @click="cancelClick" class="mr-3">取消</BUTTON>
                    <BUTTON :type="'submit'" >確認</BUTTON>
                    </div>
                </Form>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import * as yup from 'yup';
import { computed, defineComponent, onMounted, ref ,toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { CRUD_CONFIG } from '@/consts/global.const'
import { useBackProductStore } from '@/stores/back/BackProductStore';
import { Field, Form } from 'vee-validate';
import INPUT from '@/components/form/Input.vue'
import BUTTON from "@/components/form/Button.vue";

const productStore = useBackProductStore()
const {  formOrderType, selectOrders } = storeToRefs(productStore)
const formTitle = computed(() => {
    if (formOrderType.value === CRUD_CONFIG.CREATE) return '新增';
    if (formOrderType.value === CRUD_CONFIG.UPDATE) return '編輯';
    return ''
})

const emits = defineEmits(['close','confirm']);
function cancelClick() {
    emits('close');
}
//表單驗證
const schema = yup.object({
    name: yup.string().required('請輸入使用者名稱'),
    email: yup.string().required('請輸入信箱'),
    address: yup.string().required('請輸入地址'),
    tel: yup.number().typeError('請輸入正確電話').required('請輸入電話'),
})
const initValues = ref({
    name:selectOrders.value?.user.name ?? '',
    email:selectOrders.value?.user.email ?? '',
    address:selectOrders.value?.user.address ?? '',
    tel:selectOrders.value?.user.tel ?? '',
})

//送出表單
function onSubmit(values:any){
    const updatedValue = {...selectOrders.value,user:values}
    console.log(updatedValue)
    productStore.updateOrder(updatedValue).subscribe((res)=>{
        if(res){
            emits('confirm');
            console.log(res)
        }
    })
}
</script>
 
<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center; 
}

.modal-container{
  background-color: #fff;
  transition: all 0.3s ease;
}

/* Webkit 滾動條 */
::-webkit-scrollbar {
  width: 12px; /* 設置滾動條寬度 */
}

::-webkit-scrollbar-track {
  background: #f1f1f1; /* 設置滾動條軌道的背景色 */
  border-radius: 8px; /* 設置滾動條軌道的圓角 */
}

::-webkit-scrollbar-thumb {
  background: #888; /* 設置滾動條滑塊的背景色 */
  border-radius: 8px; /* 設置滾動條滑塊的圓角 */
}

.uploadStyle {
    /* label的樣式 */
}
</style>