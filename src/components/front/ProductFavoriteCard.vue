<template>
    <router-link
    :to="`/product-list/product/${productList.id}`"
    v-if="productList" 
    @click.prevent="$emit('selectProduct',productList)"
    class="border-b-4 border-primary-500 cursor-pointer  mt-4  bg-white rounded-md p-4  grid grid-cols-5 relative items-center"
    >
        <div>
        <div class="text-sm inline-block  bg-gray-300 px-1 rounded-sm mb-2">{{ productList.unit }}</div>
        <img :src="productList.imageUrl" class="w-[150px] " alt="">
        </div>
        <div class="ms-4 flex flex-col col-span-3 h-full">
            <div class="">{{ productList.title }}</div>
            <div class="text-sm	text-gray-500">{{ productList.description }}</div>
            <div class="mt-auto ">月租/${{ productList.price }}</div>
        </div>
        <div class="absolute right-3 top-3">
        <div>
        <i 
        @click.prevent="$emit('toggle-favorite',productList)"
        class=" cursor-pointer bi bi-bookmark-fill text-gray-500 border-[0.5px] border-gray-500 p-2 rounded-full"
        :class="[productList.isFavorite? 'bi-bookmark-fill':'bi-bookmark']"
        ></i> 
        </div>
    </div>
    </router-link>
</template>
<script setup lang="ts">
const props = defineProps({
    productList:{
        type:Object,
        required:true
    }
})
</script>