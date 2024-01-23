<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center " v-for="(item, i) in breadcrumbList" :key="i">
        <router-link :to="item.path"  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">{{ item.meta.title }}</router-link>
        <span v-if="i !== breadcrumbList.length - 1" class=" text-sm font-medium text-gray-700  dark:text-gray-400  pl-2"> / </span>
      </li>
    </ol>
  </nav>

</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbList = ref([])

const isHome = () => {
  return route.name === 'Home'
}

const getBreadcrumbs = () => {
  // 匹配到当前路由
  let matched = route.matched
  if (!isHome(matched[0])) {
    matched = [{ path: '/', meta: { title: '首頁' } }].concat(matched)
  }
  // 从 breadcrumb 列表中排除名称为 'admin' 的路由
  breadcrumbList.value = matched.filter(item => item.name !== 'admin')
}

watch(route, getBreadcrumbs)
onMounted(getBreadcrumbs)
</script>




