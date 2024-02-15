<template>
<div class="bg-gradient-to-r from-primary-300 to-primary-800 animate-gradient min-h-screen flex items-center">
  <div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-1 overflow-hidden">
    <div class="flex items-center justify-center ">
      <img src="@/assets/background-2.svg" class="absolute w-2/3 mt-4">
    </div>
    <Form 
      ref="loginForm" 
      class=" bg-white px-10 py-10 rounded-md w-[300px]  	z-10"
      :validation-schema="schema"
      :initial-values="initValues"
      @submit="onSubmit($event)">
      <div class="text-xl font-bold text-primary-500 mb-2 text-center ">立即登入</div>
        <div class=" flex flex-wrap gap-x-6 gap-y-6">
                  <div class="w-full">
                    <label class="block text-sm font-medium leading-6 text-gray-900">帳號</label>
                    <div class="mt-2 w-full">
                      <Field
                        id="username"
                        v-slot="{ field, value, errorMessage }"
                        name="username"
                      >
                        <INPUT
                          v-bind="field"
                          :placeholder="'請輸入帳號'"
                          :model-value="value"
                          :error-message="errorMessage"
                        />
                      </Field>
                    </div>
                  </div>
        </div>
        <div class="pt-6 flex flex-wrap gap-x-6 gap-y-6">
                    <div class="w-full">
                      <label class="block text-sm font-medium leading-6 text-gray-900">帳號</label>
                      <div class="mt-2 w-full">
                        <Field
                          id="password"
                          v-slot="{ field, value, errorMessage }"
                          name="password"
                        >
                          <INPUT
                            v-bind="field"
                            type="password"
                            :placeholder="'請輸入密碼'"
                            :model-value="value"
                            :error-message="errorMessage"
                          />
                        </Field>
                      </div>
                    </div>
          </div>
          <BUTTON type="submit" class="w-full mt-6">登入</BUTTON>
          <BUTTON type="reset" @click.prevent="reset" :outline="true" class="w-full mt-3">取消</BUTTON>
          <div class="w-full text-center mt-3">
          <router-link to="/home" class="text-sm text-gray-500 hover:text-primary-500">返回前台首頁</router-link>
          </div>
        <!-- <BUTTON type="submit" class="text-white bg-primary-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</BUTTON>
        <button type="submit" class="text-white bg-primary-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click.prevent="getProduct()">登出</button> -->

    </Form>
  </div>
</div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { Field, Form, defineRule, ErrorMessage, configure } from 'vee-validate';
import { onMounted, ref } from 'vue';
import INPUT from '@/components/form/Input.vue';
import BUTTON from '@/components/form/Button.vue';

import { useLoginStore } from '@/stores/LoginStore';
import { storeToRefs } from 'pinia';
import { useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';

const router = useRouter();
// login
const loginStore = useLoginStore();
const { requestBody }= storeToRefs(loginStore)
const schema = yup.object({
  username: yup.string().required('請輸入帳號').email('請輸入正確信箱'),
  password: yup.string().required('請輸入密碼')
});
const initValues = ref({
  // username: 'ccc551231@yahoo.com.tw',
  // password: 'ccc55112',
  username: '',
  password: '',
});
function onSubmit(values: any) {
  requestBody.value = JSON.stringify(values);
  loginStore.Login(requestBody.value).subscribe((res) => {
    if (res) {
      const token = res.token
      console.log(token)
      sessionStorage.setItem('token', token)
      router.push({ name: 'product' })
    }
    
  });
}

function getProduct() {
  loginStore.getProduct().subscribe((res) => {
    console.log(res)
  })
}
function logOut() {
  loginStore.logOut().subscribe((res) => {
    console.log(res)
  })
}
const loginForm = ref(null);
function reset(){
if(loginForm.value){
  loginForm.value.resetForm();
}
}
onMounted(() => {
})
</script>
