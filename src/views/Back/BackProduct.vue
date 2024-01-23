
import type { log } from 'console';

<template>
    <section class="bg-primary-300 ">
         <div class="max-w-screen-xl  item-center mx-auto">
            <div class="flex justify-between">
                <breadCrumbs></breadCrumbs>
                <button @click="onPositiveClick(CRUD_CONFIG.CREATE)">新增</button>
            </div>
            
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
            <Table :data="products" :columns="column">
                <template #enable="{ item }">
                        <span>{{ item.is_enabled ? "啟用" : "停用" }}</span>
                    </template>
                <template  #Function="{ item }" >
                    <Button @click="onPositiveClick(CRUD_CONFIG.UPDATE,item)" :type="'button'" :outline="true" :size="s" class="mr-0 xl:mr-2">編輯</Button>
                    <Button @click="onPositiveClick(CRUD_CONFIG.DELETE,item)" :type="'submit'" :size="s">刪除</Button>
                </template> 
            </Table>
        </div>
        <ProductForm v-if="showFormModal" @close="closeModal('formModal')" @confirm="onPageClick"/>
        <Pagination class="flex justify-center" :data="pagination" @updatePage="getAllProduct"></Pagination> 
        </div>
    </section>
</template>
<script setup lang="ts">
import breadCrumbs from '@/components/breadCrumbs.vue'
import { useRoute } from 'vue-router';
import Table from '@/components/Table.vue'
import { useBackProductStore } from '@/stores/BackProductStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { CRUD_CONFIG } from '@/consts/global.const';
import Pagination from '@/components/Pagination.vue'
import ProductForm from '@/components/ProductForm.vue'
import Button from "@/components/form/Button.vue";


const route = useRoute();
const productStore = useBackProductStore()
const { products, selectedProduct, formType, pagination } = storeToRefs(productStore)
const column = [
    {
        title: "序號",
        field: "Index",
    },
    {
        title: "產品類別",
        field: "category"
    },
    {
        title: "產品名稱",
        field: "title"
    },
    {
        title: "產品數量",
        field: "num"
    },
    {
        title: "產品價格",
        field: "price",
    },
    {
        title: "產品原價",
        field: "origin_price"
    },
    {
        title: "帳號狀態",
        field: "enable",
        useSlot: true
    },
    {
        title: "功能",
        field: "Function",
        useSlot: true,
    },


]
const showFormModal = ref(false);

function onPositiveClick(type: CRUD_CONFIG, item: any) {
    selectedProduct.value = item
    console.log(selectedProduct.value)
    switch (type) {
        case CRUD_CONFIG.DELETE:
            break;
        case CRUD_CONFIG.CREATE:
        case CRUD_CONFIG.UPDATE:
            formType.value = type;
            showFormModal.value = true;
            break;
        default:
            break
    }
}
function getAllProduct(page) {
    
    productStore.getProduct(page).subscribe((res) => {
        if (res) {
            console.log(products.value)
            products.value = res.products
            pagination.value = res.pagination            
        }

    })
}
function closeModal(type: string) {
    selectedProduct.value = undefined;
    switch (type) {
        case 'formModal':
            showFormModal.value = false;
            break;
        case 'modal':
            showModal.value = false;
            break;
    }
}
function onPageClick(){
    getAllProduct()
}
onMounted(() => {
        getAllProduct()
})

</script>
<style>
</style>