<template>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 bg-primary-500 text-white uppercase bg-gray-50 ">
                        <tr>
                            <th  scope="col" class="px-6 py-3 whitespace-nowrap " v-for="column in columns" :key="column.field" :class="{ 'text-center': column.title === '功能' }">
                                {{ column.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="item, idx in data" :key="item.id" class="odd:bg-white even:bg-primary-200 border-b " >
                            <td class="px-6 py-4"  v-for="column in columns" :key="column.field" :class="{ 'text-center': column.title === '功能' }">
                                <span v-if="!!column.useSlot" class="whitespace-nowrap">
                                    <slot :name="column.field" :item="item"></slot>
                                </span>
                                <span v-else-if="item[column.field]">
                                 {{ item[column.field] }}
                                </span>
                                <span v-else-if="column.field==='Index'">
                                    {{
                                        ((pagination.current_page - 1
                                         ) * itemsPerPage)+idx + 1}}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
</template>
<script setup lang="ts">
import { useBackProductStore } from '@/stores/back/BackProductStore';
import { storeToRefs } from 'pinia';
const productStore = useBackProductStore()
const { pagination, products } = storeToRefs(productStore);
import { ref , onMounted, watchEffect } from 'vue'

const itemsPerPage = ref(10); // 假設每頁顯示 10 項

interface TableItem {
    [key: string]: any;
}
interface TableColumn{
    title: string;
    field: string;
    useSlot?: boolean;
}
const props = defineProps({
    columns: {
        type: Array as () => TableColumn[],
        required: true
    },
    data: {
        type: Array as ()=>TableItem[],
        required: true
    }
})
// onMounted(() => {
//     watchEffect(() => {
//         console.log(pagination.value);
//     });
// })
</script>