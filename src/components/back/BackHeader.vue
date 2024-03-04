<template>
    <header>
    <nav class="bg-primary-800">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link
        :to="'/back/product'"
        class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="@/assets/logo.svg" class="h-6" alt="Flowbite Logo" />
        </router-link>
        <button @click="toggleNavbar" type="button" class="group inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <svg class="w-5 h-5 text-white group-hover:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div class="w-full md:w-auto" :class="{ 'hidden': !isNavbarOpen, 'block': isNavbarOpen }" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                <router-link 
                  :to="{path:'/back/product'}"
                  :class="{ 'activeBack': $route.path === '/back/product' }" 
                  class=" block py-2 px-3 text-white rounded hover:text-primary-500 md:hover:bg-transparent md:border-0  md:p-0">商品管理
                </router-link>
                <router-link 
                  :to="{path:'/back/order'}"
                  :class="{'activeBack':$route.path === '/back/order'}"
                  class="block py-2 px-3 text-white rounded hover:text-primary-500 md:hover:bg-transparent md:border-0  md:p-0">訂單管理
                </router-link>
                <router-link 
                :to="{path:'/login'}"
                :class="{'activeBack':$route.path === '/login'}"
                @click.prevent="logOut"
                class="block py-2 px-3 text-white rounded hover:text-primary-500 md:hover:bg-transparent md:border-0  md:p-0">登出
                </router-link>
              </ul>
        </div>
      </div>
    </nav>
    </header>
</template>
<script  setup lang="ts">
import { onMounted,ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia';
import { useBackProductStore } from '@/stores/back/BackProductStore';
const backStore = useBackProductStore()
const isNavbarOpen = ref(true);
const toggleNavbar = () => {
    isNavbarOpen.value = !isNavbarOpen.value;
};
function logOut(){
  backStore.logOut().subscribe((res)=>{
    console.log(res)
  })
}
watchEffect(() => {
    const navbar = document.getElementById('navbar-default');
    if (navbar) {
        navbar.style.display = isNavbarOpen.value ? 'block' : 'none';
    }
});
onMounted(() => {
  backStore.checkProduct().subscribe((res) => {
        console.log(res)
    })
})
</script>
<style>
.activeBack{
  color: #55B9C6
}
@media (min-width: 768px) {
  #navbar-default {
    display: block; /* 在大于等于 700px 的屏幕上隐藏 */
  }
}
</style>