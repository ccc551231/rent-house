<template>
    <div class="modal-mask">
            <div class="modal-container rounded-lg dark:bg-gray-700 w-4/5 max-w-screen-md px-3 py-3 mx-auto h-3/4 overflow-y-auto">
                <div class="modal-header flex items-center justify-between  md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 ">
                        {{ formTitle }} 產品
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
                    @submit="onSubmit($event)">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
                        <div class="form-control flex flex-col items-start">
                            <label>產品名稱</label>
                            <Field 
                            id="title" 
                            v-slot="{ field , value , errorMessage }" 
                            name="title">
                                <INPUT 
                                    v-bind="field"
                                    :model-value="initValues.title = value"
                                    :error-message="errorMessage"
                                    />
                            </Field>
                        </div>
                        <div class="form-control flex flex-col items-start">
                                <label>產品類別</label>
                                <Field v-slot="{ field, value, errorMessage }" name="category">
                                    <INPUT 
                                        v-bind="field"
                                        :model-value="initValues.category = value"
                                        :error-message="errorMessage"
                                        />
                                </Field>
                        </div>
                        <div class="form-control flex flex-col items-start">
                                    <label>產品單位</label>
                                    <Field v-slot="{ field, value, errorMessage }" name="unit">
                                        <INPUT 
                                            v-bind="field"
                                            :model-value="initValues.unit = value"
                                            :error-message="errorMessage"
                                            />
                                    </Field>
                            </div>
                        <div class="form-control flex flex-col items-start">
                                    <label>產品價格</label>
                                    <Field v-slot="{ field, value, errorMessage }" name="price">
                                        <INPUT 
                                            v-bind="field"
                                            :model-value="initValues.price = value"
                                            :error-message="errorMessage"
                                            />
                                    </Field>
                        </div>
                        <div class="form-control flex flex-col items-start">
                                        <label>產品原價</label>
                                        <Field v-slot="{ field, value, errorMessage }" name="origin_price">
                                            <INPUT 
                                                v-bind="field"
                                                :model-value="initValues.origin_price = value"
                                                :error-message="errorMessage"
                                                />
                                        </Field>
                            </div>
                        <div class="form-control flex flex-col items-start">
                            <label>產品說明</label>
                            <Field v-slot="{ field, value, errorMessage }" name="content">
                            <INPUT 
                                v-bind="field"
                                :model-value="initValues.content =value"
                                :error-message="errorMessage"
                            />
                            </Field>
                        </div>
                        <div class="form-control flex flex-col items-start">
                                <label>產品描述</label>
                                <Field v-slot="{ field, value, errorMessage }" name="description">
                                <INPUT 
                                    v-bind="field"
                                    :model-value="initValues.description =value"
                                    :error-message="errorMessage"
                                />
                                </Field>
                        </div>
                        <div class="form-control flex flex-col items-start">
                                    <label>產品狀態</label>
                                    <Field v-slot="{ field, value, errorMessage }" name="is_enabled">
                                    <TOGGLE
                                    v-bind="field"
                                    :value="value"
                                    />
                                </Field>
                        </div>
                        <div class="form-control flex flex-col items-start  col-span-full">
                            <!-- ============================大圖上傳============================= -->
                            <label>選擇首圖</label>
                                <div
                                    id="upload-big"
                                    class="flex flex-col justify-center items-center border border-dashed border-black/30 rounded-md p-10 pb-6 min-h-[263px] w-full"
                                    @click="clickUploadBtn('uploadBigBtn')"
                                >
                                <img
                                    src="@/assets/icon_upload-consent-letter.png"
                                    alt="icon-upload"
                                    class="mb-2"
                                >
                                <p class="text-sm text-black/50 mb-4">
                                    限上傳PNG檔或JPG檔
                                </p>
                                <Input 
                                    type="file"
                                    ref="mainFileRef"
                                    id="uploadBigBtn"
                                    @change="uploadMainImg(true, $event)"
                                    style="display: none;" >
                                </Input>
                                    <label type="button" for="uploadBigBtn" class="uploadStyle">
                                        選擇檔案
                                    </label> 
                                    <img :src="initValues.imageUrl" alt="" class="w-60" />
                                    </div>  
                                </div>
                            <!-- ============================多圖============================= -->
                            <div class="form-control flex flex-col items-start overflow-hidden col-span-full">
                            <label>選擇內文圖</label>
                                <div v-if="initValues && initValues.imagesUrl.length !== 0" 
                                class="flex flex-wrap justify-center items-center border border-dashed border-black/30 rounded-md p-10 pb-6 min-h-[263px]">
                                    <div
                                    v-for="(image, key) in initValues.imagesUrl" :key="key"
                                    class="mb-3 p-2 flex items-center justify-between w-full flex-col md:flex-row "
                                    @click="clickUploadBtn(`uploadSmallBtn${key}`)"
                                    >
                                    <div class="flex flex-col items-center ">
                                        <img
                                            src="@/assets/icon_upload-consent-letter.png"
                                            alt="icon-upload"
                                            class="mb-2 w-16"
                                        >
                                        <p class="text-sm text-black/50 mb-4">
                                            限上傳PNG檔或JPG檔
                                        </p>
                                        <Input 
                                                type="file"
                                                ref="fileRef"
                                                id="`uploadSmallBtn${key}`"
                                                @change="uploadMainImg(false, $event)"
                                                style="display: none;" >
                                        ></Input>
                                        <label type="button" for="`uploadSmallBtn${key}`" class="uploadStyle">
                                                選擇檔案
                                        </label> 
                                    </div>
                                    <div class="flex items-center flex-col md:flex-row ">
                                    <img  :src="image" class="w-60 mr-0 mb-2 md:mr-2 md:mb-0" />

                                        <Button
                                            class="btn btn-outline-danger"
                                            :type="'button'"
                                            :outline="true"
                                            @click="initValues.imagesUrl.splice(key, 1)"
                                        >
                                            刪除
                                        </Button>
                                        </div>
                                        
                                    </div>
                                </div>
                                 <Button
                                        :type="'button'"
                                        class="btn btn-primary w-100"
                                        @click="createImages"
                                        :size = "'custom'"
                                        :width="250"
                                        >
                                        + 新增圖片
                                </Button>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="pt-8 show-modal-button w-full flex justify-center" >
                            <Button :outline="true"  :type="'button'" 
                         @click="cancelClick" class="mr-3">取消</Button>
                            <Button 
                            :type="'submit'">確認</Button>
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
import { useBackProductStore } from '@/stores/BackProductStore';
import { Field, Form } from 'vee-validate';
import INPUT from '@/components/form/Input.vue'
import TOGGLE from "@/components/form/Toggle.vue";
import Button from "@/components/form/Button.vue";
import { nextTick } from 'vue';


const productStore = useBackProductStore()
const {  formType, selectedProduct } = storeToRefs(productStore)
const formTitle = computed(() => {
    if (formType.value === CRUD_CONFIG.CREATE) return '新增';
    if (formType.value === CRUD_CONFIG.UPDATE) return '編輯';
    return ''
})
const emits = defineEmits(['close', 'confirm']);
function cancelClick() {
    emits('close');
}
//表單驗證
const schema = yup.object({
    title: yup.string().required('請輸入產品名稱'),
    category: yup.string().required('請輸入產品類別'),
    price: yup.number().required('請輸入產品價格'),
    origin_price: yup.number().required('請輸入產品原價'),
})

const initValues =ref({
    title: selectedProduct.value?.title ?? '',
    category: selectedProduct.value?.category ?? '',
    unit: selectedProduct.value?.unit ?? '個',
    price: selectedProduct.value?.price ?? 0,
    origin_price: selectedProduct.value?.origin_pric ?? 0,
    is_enabled: selectedProduct.value?.is_enabled ?? false,
    content: selectedProduct.value?.content ?? '',
    description: selectedProduct.value?.description ?? '',
    imageUrl: selectedProduct.value?.imageUrl ?? '',
    imagesUrl: selectedProduct.value?.imagesUrl ?? [],
})

function onSubmit(values: any) {
    values.price = parseFloat(values.price);
    values.origin_price = parseFloat(values.origin_price);
    values.imageUrl = initValues.value.imageUrl; // 将文件信息添加到 values 对象中
    console.log(values.imageUrl)
    values.imagesUrl = initValues.value.imagesUrl;
    const prams = values
    if (formType.value === CRUD_CONFIG.CREATE) {
        console.log(prams)
        productStore.createProduct(prams).subscribe((res) => {
            console.log(res)
            emits('close');
            emits('confirm');
        })
    }
    if (formType.value === CRUD_CONFIG.UPDATE) {
        const selectedProductRef = toRefs(selectedProduct.value);
        console.log(selectedProductRef)
        const newPrams = {
            id: selectedProduct.value.id,
            num: selectedProduct.value.num,
            ...values
        }
        console.log(newPrams)
        productStore.updateProduct(newPrams).subscribe((res) => {
            console.log(res)
            emits('close');
            emits('confirm');
        })
    }
}

function clickUploadBtn(id: string) {
    console.log(id)
    const btn = document.getElementById(id) as HTMLButtonElement;
    // 触发Input元素的点击事件
    if (btn) {
        btn.click();
    }
}
function uploadMainImg(isMain: boolean, e: any) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file-to-upload', file);    
    productStore.uploadImage(formData).subscribe((res) => {
        if (isMain) {
            initValues.value.imageUrl = res.imageUrl
            console.log(initValues.value.imageUrl)
        } else {
            initValues.value.imagesUrl[initValues.value.imagesUrl.length - 1] = res.imageUrl
            console.log(initValues.value.imagesUrl)
        }
    })
}
function createImages() {
    console.log(initValues.value.imagesUrl)
    // initValues.value.imagesUrl = [];
    initValues.value.imagesUrl.push("");
    console.log(initValues.value.imagesUrl)
    // if (selectedProduct.value.imagesUrl) {
    //     selectedProduct.value.imagesUrl.push("");
    // } else {
    //     selectedProduct.value.imagesUrl = [];
    //     selectedProduct.value.imagesUrl.push("");
    // }
}



defineComponent({
    name: 'ProductFormComponent'
});

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