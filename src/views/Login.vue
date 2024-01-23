<template>
<Form  class="max-w-sm mx-auto"
  :validation-schema="schema"
  :initial-values="initValues"
  @submit="onSubmit($event)">
    <div class="pt-6 flex flex-wrap gap-x-6 gap-y-6">
              <div class="">
                <label class="block text-sm font-medium leading-6 text-gray-900">帳號</label>
                <div class="mt-2">
                  <Field
                    id="username"
                    v-slot="{ field, value, errorMessage }"
                    name="username"
                  >
                    <Input
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
                <div class="">
                  <label class="block text-sm font-medium leading-6 text-gray-900">帳號</label>
                  <div class="mt-2">
                    <Field
                      id="password"
                      v-slot="{ field, value, errorMessage }"
                      name="password"
                    >
                      <Input
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
    <button type="submit" class="text-white bg-primary-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</Form>
      <button type="submit" class="text-white bg-primary-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click.prevent="getProduct()">登出</button>

</template>

<script setup lang="ts">
import * as yup from 'yup';
import { Field, Form, defineRule, ErrorMessage, configure } from 'vee-validate';
import { onMounted, ref } from 'vue';
import Input from '@/components/form/Input.vue';
import { useLoginStore } from '@/stores/LoginStore';
import { storeToRefs } from 'pinia';
import { useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';

const router = useRouter();
// login
const loginStore = useLoginStore();
const { requestBody }= storeToRefs(loginStore)
const schema = yup.object({
  username: yup.string().required('請輸入帳號'),
  password: yup.string().required('請輸入密碼')
});
const initValues = ref({
  username: 'ccc551231@yahoo.com.tw',
  password: 'ccc55112',
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
onMounted(() => {
})
</script>
