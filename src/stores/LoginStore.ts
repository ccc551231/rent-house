import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Observable, map, of } from 'rxjs';
import { useApiStore } from './apiStore';
//import { API } from '../consts/global.const';


export const useLoginStore = defineStore('login', () => {
    const apiStore = useApiStore();
    const requestBody=ref()
    
    function Login(user: any): Observable<any> {
        const url = '/admin/signin'
        return apiStore.postRequest(url, user).pipe(
            map((res) => {
                console.log(res);
            return res.data
            })
        );
    }
  
    function getProduct(): Observable<any> {
        const url = `api/${import.meta.env.VITE_APP_PATH}/products/all`;

        return apiStore.getRequest(url).pipe(
            map((res) => {
                console.log(res);
                return res.data; // 返回 res，确保在管道中传递正确的数据
            })
        );
    }
    function logOut(): Observable<any> {
        const url = '/logout'
        return apiStore.deleteRequest(url).pipe(
            map((res) => {
                console.log(res)
                return res
            })
        )
    }
    return {
        Login, requestBody, logOut, getProduct
    }
})