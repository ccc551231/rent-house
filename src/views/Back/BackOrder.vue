<template>
    <section>
        <Loading :active="isLoading"></Loading>
        <div class="max-w-screen-xl item-center mx-auto">
            <div class="flex justify-between">
            <BREADCRUMBS></BREADCRUMBS>
            <!-- <Button @click="onPositiveClick(CRUD_CONFIG.CREATE)">新增</Button> -->
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
                <Table :data = "orderUserData" :columns="column">
                    <template #Function="{item}">
                        <Button @click="onPositiveClick(CRUD_CONFIG.UPDATE, orders[item.index])" :type="'submit'" :size="'s'" :outline="true" class="mr-2">編輯</Button>
                        <Button @click="onPositiveClick(CRUD_CONFIG.DELETE, orders[item.index])" :type="'submit'" :size="'s'">刪除</Button>
                    </template>
                </Table> 
            </div>
            <ProductOrderForm v-if="showFormModal" @close="closeModal('formModal')" @confirm="closeModal('modal')"></ProductOrderForm>
            <Pagination class="flex justify-center" :data="pagination" @updatePage="getAllOrders"></Pagination>
        </div>
        
    </section>
</template>
<script setup lang="ts">
import BREADCRUMBS from '@/components/breadCrumbs.vue'
import Button from "@/components/form/Button.vue";
import { CRUD_CONFIG } from '@/consts/global.const';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBackProductStore } from '@/stores/back/BackProductStore';
import Table from '@/components/back/Table.vue'
import Pagination from '@/components/Pagination.vue'
import ProductOrderForm from '@/components/back/orderForm.vue'

const productStore = useBackProductStore()
const { orders,selectOrders,formOrderType,orderUserData,pagination,isLoading } = storeToRefs(productStore)

const column = [
{
        title: "序號",
        field: "Index",
    },
    {
        title:"使用者",
        field: "name",
    },
    {
        title:"信箱",
        field: "email",
    },
    {
        title:"地址",
        field: "address"
    },
    {
        title:"電話",
        field: "tel"
    },
    {
        title:"功能",
        field:"Function",
        useSlot: true,
    }
]
const formType= ref({})
const showFormModal = ref(false);
function getAllOrders(page=1){
    isLoading.value=true
    productStore.getOrder(page).subscribe((res)=>{
        if(res){
            isLoading.value=false
            orders.value = res.orders
            pagination.value = res.pagination
            console.log(pagination.value)
            orderUserData.value = orders.value.map((order, index) => ({ ...order.user, index })) // 添加索引
        }
    })
}
function onPositiveClick(type:CRUD_CONFIG,item:any){
    selectOrders.value = item
    formOrderType.value = type;
    console.log( formType.value,selectOrders.value)
    switch(type){
        case CRUD_CONFIG.DELETE:
            console.log('delete')
            deleteOrder(selectOrders.value) // 传递索引

        break
        case CRUD_CONFIG.UPDATE:
        case CRUD_CONFIG.CREATE:
            showFormModal.value = true;
        break
    }
}
function deleteOrder(item:any){
    isLoading.value=true
    productStore.deleteOrder(item).subscribe((res)=>{
        if(res){
            isLoading.value=false
            console.log(res)
            getAllOrders()
        }
    }) 
}
function closeModal(type: string){
    selectOrders.value = undefined;
    switch(type){
        case 'formModal':
        showFormModal.value = false;
        break;
        case 'modal':
        showFormModal.value = false
        getAllOrders()
        break;
    }
}

onMounted(() => {
    getAllOrders()
})
</script>