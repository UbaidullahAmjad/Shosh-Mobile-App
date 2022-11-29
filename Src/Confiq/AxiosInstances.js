import axios from 'axios';
import store from '../Store';
import { otherStatus } from './helper';

// export const apiInstance = axios.create({
//     baseURL: "https://shosharabia.com/",
//     timeout: 5000,
//     headers: {
//         // 'Content-type':'multipart/form-data',
//         'Accept': "application/json",
//         'Content-Type': "application/json",

//         // 'Access-Control-Max-Age': 0
//     }
// })

// API Instance withOut Button Loader

export const apiInstance = axios.create({
    baseURL: store?.getState()?.cart?.ChangeAPILanguage,
    timeout: 5000,
})

apiInstance.interceptors.request.use(function (config) {
    console.log(config)
    return config;
}, function (error) {
    return Promise.reject(error);
});

apiInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    otherStatus(error.response)
    return Promise.reject(error);
});



// API Instance withOut Button Loader
export const apiInstanceWIthOutLoader = axios.create({
    baseURL: store?.getState()?.cart?.ChangeAPILanguage,
    timeout: 5000,
    headers: {
        'Authorization': 'Basic Y2tfMTM1OGIyMGUzMjFjNTkyOTZiODNiNTQwNWFiYWRkZjZkY2YzZGQwZDpjc181YmFmZmZjOGY5NTNkY2ZjZGUyNGY1M2IxZTQzYzkxMzIxNzk0M2Vh',
        'Cookie': 'bvfw-bypass-cookie=5ab61e189a687f5a2b6aa0789cd1beea19b0f890; wcml_client_currency=AED; wcml_client_currency_language=en; wp-wpml_current_language=en',
        // "Content-Type":"multipart/form-data"
    },
    redirect: 'follow'
})

apiInstanceWIthOutLoader.interceptors.request.use(function (config) {
    console.log(config)
    return config;
}, function (error) {
    return Promise.reject(error);
});

apiInstanceWIthOutLoader.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    otherStatus(error.response)
    return Promise.reject(error);
});

