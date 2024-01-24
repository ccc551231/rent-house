<template> 
    <div v-if="sortHotStore" class=" relative bg-cover bg-center bg-no-repeat " 
    :style="{ 'background-image': `url(${sortHotStore.imageUrl})`  }"
     >
     <div class="absolute inset-0 bg-black opacity-50"></div>
     <div class="absolute bottom-2 left-3 text-white">
        <div>{{ sortHotStore.title }}</div>
        <div>{{ sortHotStore.price }}</div>
    </div>
    <div class="absolute top-3 right-3">
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