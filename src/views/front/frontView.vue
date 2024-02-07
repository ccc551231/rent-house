<template>
    <header>
        <nav class="bg-primary-500 border-gray-200 dark:bg-gray-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <router-link  
            :to="'/home'"
             class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="@/assets/logo.svg" class="h-6"  />
            </router-link>
            <button @click="toggleNavbar" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-primary-300  focus:outline-none focus:ring-2 focus:ring-gray-100" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="w-full md:w-auto" :class="{ 'hidden': !isNavbarOpen, 'block': isNavbarOpen }" id="navbar-default">
              <ul class="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                <router-link 
                  :to="{path:'/category'}"
                  :class="{ 'active': $route.path === '/category' }" 
                  class=" block py-2 px-3 text-white rounded hover:text-primary-800 md:hover:bg-transparent md:border-0  md:p-0">租屋分類
                </router-link>
                <router-link 
                  :to="{path:'/search'}"
                  :class="{'active':$route.path === '/search'}"
                  class="block py-2 px-3 text-white rounded hover:text-primary-800 md:hover:bg-transparent md:border-0  md:p-0">收尋房子
                </router-link>
                <router-link 
                  :to="{path:'/bookmark'}"
                  :class="{'active':$route.path === '/bookmark'}"
                  class="block py-2 px-3 text-white rounded hover:text-primary-800 md:hover:bg-transparent md:border-0  md:p-0">我的收藏
                </router-link>
                <router-link 
                :to="{path:'/login'}"
                :class="{'active':$route.path === '/login'}"
                class="block py-2 px-3 text-white rounded hover:text-primary-800 md:hover:bg-transparent md:border-0  md:p-0">登入
                </router-link>
              </ul>
            </div>
          </div>
        </nav>
    </header>
    <div class="bg-gray-200">
        <RouterView />
    </div>
    <footer class="bg-primary-800 text-center text-white">
      <div 
      class="max-w-screen-xl mx-auto p-6 py-10 grid grid-cols-1 items-center sm:grid-cols-2">
        <div class="flex justify-center sm:justify-start">
          <img src="@/assets/logo.svg">
        </div>
        <div class="text-center mt-4 sm:text-right sm:mt-0 ">
          <router-link 
          :class="{'active-footer':$route.path === '/search'}"
          :to="`search`" class="mr-4"
          >收尋租屋</router-link>
          <router-link 
          :class="{'active-footer':$route.path === '/bookmark'}"
          :to="`bookmark`" class="mr-4">我的收藏</router-link>
          <router-link :to="`login`" class="">後台登入</router-link>
        </div>
      </div>
      <hr class="font-white  border-white">
        <div class="py-4">© 2023 Miao.design</div>
    </footer>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia';
import { useBackNavStore } from '@/stores/BackNavStore';
const navStore = useBackNavStore()
const isNavbarOpen = ref(true);
const toggleNavbar = () => {
    isNavbarOpen.value = !isNavbarOpen.value;
};
watchEffect(() => {
    const navbar = document.getElementById('navbar-default');
    if (navbar) {
        navbar.style.display = isNavbarOpen.value ? 'block' : 'none';
    }
});
onMounted(() => {
    navStore.checkProduct().subscribe((res) => {
        console.log(res)
    })
})
</script>
<style>
.active{
  color: #2B94A1
}
.active-footer{
  color: #B7E8EF
}
@media (min-width: 768px) {
    #navbar-default {
        display: block;
        /* 在大于等于 700px 的屏幕上隐藏 */
    }
}
</style>