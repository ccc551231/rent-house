<template>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-4 ">
        <template
        v-for="item in product" :key="item.id">
        <router-link
            class="
            cursor-pointer  transition duration-200 ease-in-out rounded mb-2 flex flex-row md:flex-col w-full gap-2
            hover:-translate-y-2 group
            "
            :to="`/product-list/product/${item.id}`"
        >
            <img 
            :src="item.imageUrl" alt="" 
            class="rounded h-[100px] md:h-auto ">
            <div class="w-full grid gird-row-4 gap-2 ">
                <div class="relative ">
                <div class="inline-block rounded px-2 bg-primary-500 text-white text-sm">{{ item.unit }}</div>
                </div>
                <div class="text-lg font-bold group-hover:text-primary-500">{{ item.title }}</div>
                <div class="text-md text-gray-500">{{ item.description }}</div>
                <div class="text-lg text-gray-600 ">月租/${{ item.price }}</div>
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