<template> 
    <div v-if="sortHotStore" class=" relative bg-cover bg-center bg-no-repeat  overflow-hidden group" 
    :style="{ 'background-image': `url(${sortHotStore.imageUrl})`  }"
     >
     <div class="absolute inset-0 bg-black opacity-45 duration-200 ease-in-out group-hover:opacity-20"></div>
     <div class="absolute bottom-2 left-3 text-white">
        <div>{{ sortHotStore.title }}</div>
        <div>{{ sortHotStore.price }}</div>
    </div>
    <div class="absolute  right-3 duration-200 ease-in-out -top-10 group-hover:top-4">
        <i 
        @click.prevent="$emit('toggle-favorite',sortHotStore)"
        class=" bi text-white border p-2 rounded-full"
        :class="[sortHotStore.isFavorite? 'bi-bookmark-fill':'bi-bookmark']"
        ></i> 
    </div>
    </div>   
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
    sortHotStore: {
        type: Object,
        required: true
    }
})

onMounted(() => {
})
</script>