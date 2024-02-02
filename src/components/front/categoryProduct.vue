<template>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-4">
        <template
        v-for="item in product" :key="item.id">
        <router-link
            class="cursor-pointer mb-2 flex flex-row md:flex-col w-full gap-2 border-b border-gray-100 md:border-none"
            :to="`/product-list/product/${item.id}`"
        >
            <img 
            :src="item.imageUrl" alt="" 
            class="rounded h-[100px] md:h-auto">
            <div class="w-full">
                <div class="px-2 bg-primary-500 inline-block text-white text-sm">{{ item.unit }}</div>
                <div class="text-lg font-bold">{{ item.title }}</div>
                <div class="text-md text-gray-100">{{ item.description }}</div>
                <div class="text-lg text-gray-200 ">月租/${{ item.price }}</div>
            </div>
            </router-link>
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    product:{
        type:[],
        required: true

    }
})

</script>