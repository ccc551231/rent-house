<template>
    <div class="goodProduct shadow-md shadow-indigo-500/100 group">
        <div class="goodProduct_imgBox relative l">
            <img 
            class="relative bg-cover bg-center bg-no-repeat  min-h-[150px] w-full "
            :style="{ 'background-image': `url(${sortGoodStore.imageUrl})` }">
            <div class="absolute inset-0 bg-black opacity-45 duration-200 ease-in-out group-hover:opacity-20"></div>
            <div class="absolute bottom-0 left-0 p-2 w-full backdrop-blur-sm bg-white/10 z-10">
                <p class="text-white">{{ sortGoodStore.title }}</p>
            </div>
            <div class="absolute -top-10 right-3 cursor-pointer duration-200 ease-in-out group-hover:top-4">
                <i 
                @click.prevent = "$emit('toggle-favorite',sortGoodStore)"
                class=" bi  text-white border p-2 rounded-full"
                :class="[sortGoodStore.isFavorite? 'bi-bookmark-fill': 'bi-bookmark']"
                ></i> 
         </div>
        </div>
        <div class="bg-white p-2 flex justify-between ">
                <div >
                    {{ sortGoodStore.price }}
                </div>
                <div >
                       {{ sortGoodStore.price }}
                </div>
            </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
    sortGoodStore: {
        type: Object,
        required: true
    }
})
onMounted(() => {
})
</script>