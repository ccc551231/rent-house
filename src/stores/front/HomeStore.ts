import { ref } from 'vue'
import type { Ref } from 'vue';

import { defineStore } from 'pinia'
import { Observable, map, of } from 'rxjs';
import { useApiStore } from '@/stores/apiStore';
import type { ProductIner } from '@/interface/front.interface';
import { CATEGORY, TAGTIME, TAGRULE, TAGEQUIMENT } from '@/consts/front.const'
export const useHomeStore = defineStore('HomeStore', () => {
    const hotProducts: Ref<any[]> = ref([]);
    const newProducts: Ref<any[]> = ref([]);
    const Products = ref<ProductIner[]>([{
    category: '',
    content: '',
    description: '',
    id: '',
    imageUrl: '',
    imagesUrl: [],
    is_enabled: 1,
    origin_price: 0,
    price: 0,
    title: '',
    unit: '',
    }]);
    const apiStore = useApiStore();
    const recommendProduct:Ref<any> = ref({});
    const detailProduct:Ref<any> = ref({});

    function getProduct(): Observable<any> {
        const url = `api/${import.meta.env.VITE_APP_PATH}/products/all`
        return apiStore.getRequest(url).pipe(
            map((res) => {
                return res.data
            })
        )
    }
    function getDetailProduct(id:any): Observable<any>{
        const url = `api/${import.meta.env.VITE_APP_PATH}/product/${id}`
        return apiStore.getRequest(url).pipe(
            map((res) => {
                return res.data
            })
        )
    }
    //判斷租屋tag
    function tag() {
        Products.value.forEach(product => {
            if (product.unit === CATEGORY.ONE) {
                product.tagEQ = TAGEQUIMENT.ONE;
                product.tagRULE = TAGRULE.ONE;
                product.tagTIME = TAGTIME.ONE;
            } else if (product.unit === CATEGORY.SECAND) {
                product.tagEQ = TAGEQUIMENT.SECAND;
                product.tagRULE = TAGRULE.SECAND;
                product.tagTIME = TAGTIME.SECAND;
            } else if (product.unit === CATEGORY.THREE) {
                product.tagEQ = TAGEQUIMENT.THREE;
                product.tagRULE = TAGRULE.THREE;
                product.tagTIME = TAGTIME.THREE;
            } else if (product.unit === CATEGORY.FOUR) {
                product.tagEQ = TAGEQUIMENT.FOUR;
                product.tagRULE = TAGRULE.FOUR;
                product.tagTIME = TAGTIME.FOUR;
            }
        })
    }
    //判斷詳細product.tag
    function detailTag() {
        if (detailProduct.value.unit === CATEGORY.ONE) {
            detailProduct.value.tagEQ = TAGEQUIMENT.ONE;
            detailProduct.value.tagRULE = TAGRULE.ONE;
            detailProduct.value.tagTIME = TAGTIME.ONE
        }
        else if (detailProduct.value.unit === CATEGORY.SECAND) {
            detailProduct.value.tagEQ = TAGEQUIMENT.SECAND;
            detailProduct.value.tagRULE = TAGRULE.SECAND;
            detailProduct.value.tagTIME = TAGTIME.SECAND
        }
        else if (detailProduct.value.unit === CATEGORY.THREE) {
            detailProduct.value.tagEQ = TAGEQUIMENT.THREE;
            detailProduct.value.tagRULE = TAGRULE.THREE;
            detailProduct.value.tagTIME = TAGTIME.THREE
        }
        else if (detailProduct.value.unit === CATEGORY.FOUR) {
            detailProduct.value.tagEQ = TAGEQUIMENT.FOUR;
            detailProduct.value.tagRULE = TAGRULE.FOUR;
            detailProduct.value.tagTIME = TAGTIME.FOUR
        }
    }


    return {
        getProduct, hotProducts, Products, newProducts, recommendProduct, tag,
        getDetailProduct, detailProduct, detailTag
    }
})