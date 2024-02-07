<template>
    <input 
    :type="type" name="" 
    :value="modelValue" 
    :placeholder="placeholder" 
    :maxlength="maxlength" 
    :disabled="disabled"
    :autocomplete="autocomplete"
    :class="{
        'error':!!errorMessage,'{bg-gray-300}': disabled,
        // 各個 size 按鈕寬度
        'w-[69px] h-[32px] py-[4px] px-[4px] text-[14px]': size === 's',
        'w-[99px] h-[40px] py-[4px] px-[8px] text-[16px]': size === 'm',
        'w-[335px] h-[48px] py-[8px] px-[12px] text-[18px]': size === 'l',
    }"
    class="rounded-md border border-gray-200 px-4 py-1 w-full  focus:transition focus:duration-150 focus:ease-in"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    <span v-if="!!errorMessage" class="text-[red] ml-1 text-left">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import { ref, defineComponent, type PropType } from 'vue';

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
    },
    size: {
        type: String as PropType<"s" | "m" | "l" | "custom" | undefined>,
        default: "s"
    },
});

defineComponent({
    name: 'NSLInputComponent',
});
</script>

<style lang="scss">
.error{
  border-color: theme('colors.danger');
}
input:focus {
  outline: none;
}
</style>
