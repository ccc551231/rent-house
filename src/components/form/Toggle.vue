<template>
    <Switch
    v-slot="{ checked }"
    :model-value="value"
    as="template"
    @update:model-value="$emit('update:modelValue', $event)"
    >
    <button
          :class="[checked ? 'bg-primary-500 on' : 'bg-gray-200 off', 'relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-offset-2']"
    >
    <span
            aria-hidden="true"
            :class="[checked ? 'translate-x-7' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 self-center transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ']"
          />
    </button>

    </Switch>
</template>
<script setup lang="ts">
import { Switch } from '@headlessui/vue';
import { defineComponent } from 'vue';
const props = defineProps({
    value: {
        type: null,
    }
});
defineComponent({
    name: 'ToggleComponent'
});
</script>
<style lang="scss">
.on::before {
    content: 'ON';
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 12px;
}

.off::before {
    content: 'OFF';
    position: absolute;
    left: 45%;
    top: 50%;
    transform: translateY(-50%);
    color: #0081c6;
    font-size: 12px;
}
</style>