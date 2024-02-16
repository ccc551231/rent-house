import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Observable, map, of } from 'rxjs';
import { useApiStore } from '../apiStore';


export const useBackNavStore = defineStore('backNav', (
) => {
    const apiStore = useApiStore();

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
        checkProduct,logOut
    }
    
})