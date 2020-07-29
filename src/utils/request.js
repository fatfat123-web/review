import axios from 'axios'
import {Message} from 'element-ui';
import {throwErr} from '@/utils/throwErr'
import md5 from 'md5'

// 默认请求地址   ok
axios.defaults.baseURL = 'http://api-qa.gczlsa.com/api-gateway';
// 超时时间
axios.defaults.timeout = 0;
// 配置content-Type        application/json 是浏览器的东西
axios.defaults.headers['Content-Type'] = 'application/json';

// 发送拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.access_token = localStorage.getItem('token')
        }
        const timeStamp = new Date().getTime();
        config.headers.request_time = timeStamp;
        config.headers.client_app_code = 'OPERATOR_WEB';
        config.headers.uuid = md5(md5(timeStamp));
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
// 添加响应拦截器
axios.interceptors.response.use(
    res => {
        if (res.status === 200) {
            return res.data;
        } else {
            Message.error(res.data.msg);
            return Promise.reject(res)
        }
    },
    error => {
        const data = error.response.data
        if (data.message) {
            Message.error(data.message)
        }
        return Promise.reject(error.response)
    }
);

export default function request(method, url, data, config = {}) {

    return axios({
        method: method,
        url: url,
        data: method === 'post' && data,
        params: method !== 'post' && data,
        ...config
    })
}
