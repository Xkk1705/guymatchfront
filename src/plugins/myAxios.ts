import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
});
//Axios请求默认时不携带Cookie的
myAxios.defaults.withCredentials = true;

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // console.log(config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 判断是否登录 没有登录则跳转到登录页
    if (response?.data?.code ===  41000) {
        window.location.href = '/#/user/login'
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default myAxios