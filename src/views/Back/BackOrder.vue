<template>
    <section>
        <div class="max-w-screen-xl item-center mx-auto">
            <div class="flex justify-between">
            <BREADCRUMBS></BREADCRUMBS>
            <!-- <Button @click="onPositiveClick(CRUD_CONFIG.CREATE)">新增</Button> -->
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
                <Table :data = "orderUserData" :columns="column"></Table> 
            </div>
            <Pagination class="flex justify-center" :data="ordersPadination" @updatePage="getAllOrders"></Pagination>
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

const productStore = useBackProductStore()
const { orders,ordersPadination,orderUserData } = storeToRefs(productStore)

const column = [
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
    }
]
const formType= ref({})
const showFormModal = ref(false);
function getAllOrders(page=1){
    console.log(page)
    productStore.getOrder(page).subscribe((res)=>{
        if(res){
            orders.value = res.orders
            ordersPadination.value = res.pagination
            orderUserData.value = orders.value.map(order=> order.user)
            console.log(orderUserData.value)
        }
    })
}
function onPositiveClick(type:CRUD_CONFIG,item:any){
    const selectedProduct = ref({});
    selectedProduct.value = item
    console.log(item)
    switch(type){
        case CRUD_CONFIG.DELETE:
            console.log('delete')
        break
        case CRUD_CONFIG.UPDATE:
        case CRUD_CONFIG.CREATE:
            formType.value = type;
            showFormModal.value = true;
            console.log(formType.value)
        break
    }
}
onMounted(() => {
    getAllOrders()
})
</script>