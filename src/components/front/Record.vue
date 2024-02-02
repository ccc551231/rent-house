<template>
        <div class="mb-1 mt-1">{{ recordProduct.title }}</div>
            <div class="mb-1">租金:{{ recordProduct.price }}</div>
            <hr>
</template>
<script setup lang="ts">
const props = defineProps({
    recordProduct:{
        type: [],
        required: true
    }
})

</script>