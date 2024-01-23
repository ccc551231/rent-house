<template>
    <button
        :disabled="props.disabled"
        :type="type"
        class="w-24 rounded-md h-8 transition"
        :class="{
            'bg-primary-500 text-white hover:bg-primary-700': !outline && !disabled,
            'border border-primary-500 bg-white text-primary-500 hover:border-primary-700 hover:text-primary-700': outline  && !disabled,
            'border bg-neutral-400 text-neutral-500': disabled && !outline,
            'border border-neutral-400 text-neutral-400': disabled && outline,

            // 各個 size 按鈕寬度
            'w-[69px] h-[32px] py-[4px] px-[4px] text-[14px]': size === 's',
            'w-[99px] h-[40px] py-[4px] px-[8px] text-[16px]': size === 'm',
            'w-[335px] h-[48px] py-[8px] px-[12px] text-[18px]': size === 'l',
        }"
      >
    <slot /> 
    </button>
</template>
<script setup lang="ts">
import { defineComponent, type PropType, ref, computed } from 'vue';
const props = defineProps({
    outline: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String as PropType<"button" | "submit" | "reset" | undefined>,
        default: "button"
    },
    size: {
        type: String as PropType<"s" | "m" | "l" | "custom" | undefined>,
        default: "s"
    },
    // 自定義寬度: 自定義之前，請將 size 設定成 "custom"
  width: {
    type: Number,   
    default: 69
  },
  // 自定義高度: 自定義之前，請將 size 設定成 "custom"
  height: {
    type: Number,   
    default: 32
  }
})
defineComponent({
    name: 'ButtonComponent'
});
</script>