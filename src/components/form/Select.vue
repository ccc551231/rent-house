 <template>
    <div class="relative">
    <Listbox
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    >
    <ListboxButton
    :id="id"
    class="relative w-full cursor-pointer rounded-lg border border-neutral-400 text-left bg-white"
    :class="{ 
        'error': !!errorMessage, 'is-disabled': disabled, 'is-focused': isButtonFocused, 
        // 各個 size 按鈕寬度
        'w-[69px] h-[32px] py-[4px] px-[4px] text-[14px]': size === 's',
        'w-[99px] h-[40px] py-[4px] px-[8px] text-[16px]': size === 'm',
        'w-[335px] h-[48px] py-[8px] px-[12px] text-[18px]': size === 'l',
        }"
    :disabled="disabled"
    @click="btnFocus"
    >
    <span 
    :placeholder="placeholder"
    :class="{ 'is-number-value': modelValue > 0, 'is-string-value': modelValue !== '', 'is-disabled': disabled}"
    >
        {{ modelValue > 0 || modelValue !== '' ? modelValue : placeholder }} 
    </span>
    <span 
        v-if="!isButtonFocused"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-2 pr-3"
        >
        <ChevronDownIcon
            class="h-5 w-5 text-primary-400"
            :class="{ 'is-disabled': disabled }"
            aria-hidden="true"
        />
    </span>
    <span
        v-if="isButtonFocused"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-2 pr-3"
        >
        <ChevronUpIcon
            class="h-5 w-5 text-primary-400"
            :class="{ 'is-disabled': disabled }"
            aria-hidden="true"
        />
    </span>
    </ListboxButton>
    <transition
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
    >
    <ListboxOptions
    class="absolute  w-full z-10 overflow-auto rounded-md border border-primary-400 border-t-0 bg-white text-base"
    >
      <ListboxOption 
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      as="template"
      v-slot="{ active }"
    >
    <ul>
        <li
        class="relative cursor-default border-b text-neutral-800 border-b-neutral-300 select-none px-3 py-2 text-left hover:bg-primary-400 hover:text-primary-500"
        :class="{ 'text-primary-500': active }"
        >
        <span class="block">{{ option.label }}</span>
        </li>
    </ul>
      </ListboxOption>
    </ListboxOptions>
    </transition>
  </Listbox>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch,type PropType,defineComponent } from 'vue';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';

const isButtonFocused = ref(false);
const emits = defineEmits(['update:modelValue']);
interface RoleOption {
  label: string;
  value: string;
}
const props = defineProps({
    modelValue:{
        type:null
    },
    options: {
      type: Array as ()=>RoleOption[],
      required: true
    },
    placeholder:{
        type: String,
        default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    size:{
        type: String as PropType<"s" | "m" | "l" | "custom" | undefined>,
        default: "s"
    }

})
const optionLabel = computed(() => {
    const option = props.options.find(o => o.value === props.value);
    if (option) {
      return option.label;
    } else {
      return '選擇項目';
    }
  });
function btnFocus() {
    const btn = document.getElementById(props.id);
    if (btn) {
      console.log(btn)
      const att = btn.getAttribute('aria-expanded');
      if (att === 'true') {
        isButtonFocused.value = false;
      } else {
        isButtonFocused.value = true;
      }
    }
    
  }
  defineComponent({
    name: 'SelectComponent'
  });
</script>  
