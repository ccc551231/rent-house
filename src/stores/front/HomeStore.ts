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
    const record =ref(JSON.parse(sessionStorage.getItem('getRecord')!)||[]);
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
    //選項資料
    const rolesOptions = ref([
        { label: "台北市", value: "台北市" },
        { label: "新北市", value: "新北市" },
        { label: "新竹市", value: "新竹市" },
        { label: "台中市", value: "台中市" },
        { label: "台南市", value: "台南市" },
        { label: "高雄市", value: "高雄市" },
        { label: "不限", value: "" },
    ]);
    const apiStore = useApiStore();
    const recommendProduct:Ref<any> = ref({});
    const detailProduct:Ref<any> = ref({});
    // 在組建初始化時從本地獲取數據
    const favoriteList = ref(JSON.parse(sessionStorage.getItem('favoriteList')!) || []);

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
    //添加近我的最愛
    function toggleFavorite(choose:any){
        const foundProduct = favoriteList.value.findIndex((product:any) => {
            return product.id === choose.id;
        });
    if (foundProduct !== -1) {
        // 如果找到了，说明已经在收藏列表中，移除它
        favoriteList.value.splice(foundProduct, 1);
        choose.isFavorite = false;
    } else {
        // 如果没找到，说明不在收藏列表中，添加它
        favoriteList.value.push(choose);
        choose.isFavorite = true;
        }
        console.log(favoriteList.value)
        sessionStorage.setItem('favoriteList',JSON.stringify(favoriteList.value))
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
        getDetailProduct, detailProduct, detailTag, favoriteList,toggleFavorite,record,rolesOptions
    }
})