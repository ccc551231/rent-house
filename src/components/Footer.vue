<template>
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