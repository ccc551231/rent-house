import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Observable, map, of } from 'rxjs';
import { useApiStore } from './apiStore';
import { CRUD_CONFIG } from '@/consts/global.const';

export const useBackProductStore = defineStore('backProduct', () => {
    const apiStore = useApiStore();
    const products = ref();
    const selectedProduct = ref();
    const pagination = ref();
    const formType = ref(CRUD_CONFIG.CREATE)
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
    return {
        getProduct, products, selectedProduct, formType, pagination, createProduct, updateProduct, uploadImage
    }
})