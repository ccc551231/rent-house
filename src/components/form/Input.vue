<template>
    <input 
    :type="type" name="" 
    :value="modelValue" 
    :placeholder="placeholder" 
    :maxlength="maxlength" 
    :disabled="disabled"
    :autocomplete="autocomplete"
    class="rounded-md border border-gray-300 px-4 py-1 w-full focus:border-primary-500 focus:transition focus:duration-150 focus:ease-in"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    <span v-if="!!errorMessage" class="text-[red] ml-1 text-left">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';

const emits = defineEmits(['update:modelValue', 'blur', 'input', 'change']);
const props = defineProps({
    name: {
    },
    value: {
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        // type: String,
        default: ref()
    },
    errorMessage: {
        type: String,
        default: ''
    },
    maxlength: {
        type: Number,
        default: 100
    },
    autocomplete: {
        type: String,
        default: 'off'
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

defineComponent({
    name: 'NSLInputComponent',
});
</script>

<style lang="scss"></style>
