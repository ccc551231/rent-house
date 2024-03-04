import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Observable, map, of } from 'rxjs';
import { useApiStore } from '../apiStore';
import { CRUD_CONFIG } from '@/consts/global.const';

export const useBackProductStore = defineStore('backProduct', () => {
    const apiStore = useApiStore();
    const products = ref();
    const selectedProduct = ref();
    const pagination = ref();
    const orders = ref();
    const ordersPagination = ref({})
    const orderUserData=ref({})
    const formType = ref(CRUD_CONFIG.CREATE)
    const formOrderType=ref(CRUD_CONFIG.CREATE)
    //Loading
    const isLoading = ref(false)
    //商品頁
    function getProduct(page=1): Observable<any>{
        const url = `api/${import.meta.env.VITE_APP_PATH}/admin/products/?page=${page}`
        return apiStore.getRequest(url).pipe(
            map((res) => {
                return res.data
            })
        )
    }
    function createProduct(item:any): Observable<any>{
        const url = `api/${import.meta.env.VITE_APP_PATH}/admin/product`
        return apiStore.postRequest(url, { data: item }).pipe(
            map((res) => {
                return res.data
            })
        )
    }
    function updateProduct(item: any): Observable<any> {
        const url = `api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`
        return apiStore.putRequest(url, { data: item }).pipe(
            map((res) => {
                return res.data
            })
        )
    }
    function uploadImage(file: any): Observable<any>{
        const url = `api/${import.meta.env.VITE_APP_PATH}/admin/upload`
        return apiStore.postRequest(url, file).pipe(map((res) => {
            console.log(file)
            return res.data
        }))
    }
    function deleteProduct(item:any):Observable<any>{
        const url=`api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`
        return apiStore.deleteRequest(url).pipe(
            map((res)=>{
                return res.data
            })
        )
    }
    //order頁面
    const selectOrders= ref()
    function getOrder(page=1):Observable<any>{
        const url = `api/${import.meta.env.VITE_APP_PATH}/admin/orders/?page=${page}`
        return apiStore.getRequest(url).pipe(
            map((res) => {
                return res.data
            })
        )
    }
    function deleteOrder(item:any):Observable<any>{
        const url=`api/${import.meta.env.VITE_APP_PATH}/admin/order/${item.id}`
        return apiStore.deleteRequest(url).pipe(
            map((res)=>{
                return res.data
            })
        )
    }
    function updateOrder(item:any):Observable<any>{
        const url=`api/${import.meta.env.VITE_APP_PATH}/admin/order/${item.id}`
        return apiStore.putRequest(url,{data:item}).pipe(
            map((res)=>{
                return res.data
            })
        )
    }
    //nav頁面
    function checkProduct(): Observable<any> {
        const url = 'api/user/check'
        return apiStore.postRequest(url).pipe(
            map((res) => {
                console.log(res);
                return res.data
            })
        );
    }
    function logOut():Observable<any>{
        const url = '/logout'
        return apiStore.postRequest(url).pipe(map((res)=>{
            console.log(res)
            return res.data
        }))
    }
    return {
        updateOrder,getProduct, products, selectedProduct, formType, pagination, createProduct, updateProduct, uploadImage,deleteProduct,orders,getOrder,ordersPagination,orderUserData,deleteOrder,checkProduct,logOut,selectOrders,formOrderType,isLoading
    }
    
})