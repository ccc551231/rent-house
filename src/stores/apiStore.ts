import { ref } from 'vue';
import { defineStore } from 'pinia';
import { catchError, filter, from, map, throwError, type Observable, config } from 'rxjs';
import axios, { type AxiosRequestConfig } from 'axios';
import { useRouter } from 'vue-router';

export const useApiStore = defineStore('api', () => {

    const axiosRequest = axios.create({
        baseURL: `${import.meta.env.VITE_APP_API}`,
        timeout: 5000,
        headers: {
            'Content-Type':'application/json'
        }
    });

    /**設定token攔截器 */
    axiosRequest.interceptors.request.use(
        config => {
            const token = sessionStorage.getItem('token')
            if (token) {
                config.headers.Authorization=token
            }
            return config;
        }
    )
    /**
     * GET Method
     * @param apiUrl 
     * @returns 
     */
    function getRequest(apiUrl: string): Observable<any> {
        const promise = axiosRequest.get(apiUrl, { headers: getHTTPHeaders() });
        return from(promise).pipe(
            filter(handleResponse),
            catchError(handleError)
        );
    }

    /**
     * POST Method
     * @param apiUrl 
     * @param requestBody 
     * @returns 
     */
    // function postRequest(apiUrl: string, requestBody?: any, config?: AxiosRequestConfig): Observable<any> {
    //     const promise = axiosRequest.post(apiUrl, requestBody, { headers: getHTTPHeaders(), ...config });
    //     return from(promise).pipe(
    //         filter(handleResponse),
    //         catchError(handleError)
    //     );
    // }
    function postRequest(apiUrl: string, requestBody?: any, config?: AxiosRequestConfig): Observable<any> {
        let headers = getHTTPHeaders();

        // 如果是 FormData，設置 Content-Type 為 multipart/form-data
        if (requestBody instanceof FormData) {
            headers = { ...headers, 'Content-Type': 'multipart/form-data' };
        }

        const promise = axiosRequest.post(apiUrl, requestBody, { headers, ...config });

        return from(promise).pipe(
            filter(handleResponse),
            catchError(handleError)
        );
    }
    
    function getHTTPHeaders(): any {
        const result = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: 'Bearer ' + sessionStorage.getItem(COMMON.TOKEN),
        };
        return result;
    }

    /**
     * PUT Method
     * @param apiUrl
     * @param requestBody
     * @returns
     */
    function putRequest(apiUrl: string, requestBody: any): Observable<any> {
        const promise = axiosRequest.put(apiUrl, requestBody, { headers: getHTTPHeaders() });
        return from(promise).pipe(
            filter(handleResponse),
            catchError(handleError)
        );
    }

    /**
     * DELETE Method
     * @param apiUrl
     * @returns
     */
    function deleteRequest(apiUrl: string): Observable<any> {
        const promise = axiosRequest.delete(apiUrl, { headers: getHTTPHeaders() });
        return from(promise).pipe(
            filter(handleResponse),
            catchError(handleError)
        );
    }

   


   

    function handleResponse(response: any): any {
        // 在這裡處理成功的回應
        // console.log(response.data)
        // if (response.data.message) {
        //     console.log(response.data.message)
        //     this.errorMsg.value = response.data.message;
        // }
        return response;
    }

    function handleError(error: any): Observable<never> {
        console.log('An error occurred:', error.response);
        // 拋出錯誤
        return throwError('An error occurred.');
    }
    return {

        getRequest,
        postRequest,
        putRequest,
        deleteRequest,
        
    };
});
