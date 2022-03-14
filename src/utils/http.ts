
import Axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import jsonAdapter from 'axios-jsonp';

const client = Axios.create({
    // 你的配置
})

axiosRetry(client, { retries: 1 })

client.interceptors.request.use(config => {
    config.url = config.url.replace('{version}','v1');
    return config;
})
client.interceptors.response.use((res) => {
    return res;
})

const request = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
    let response = null;
    try {
      response = await client.request({ url, ...config })
    } catch (error) {
        if (Axios.isCancel(error)) {
            console.log('请求取消了');
            return
        }
    }
    const result = response.data;
    // 你的业务逻辑
    return result;
}

const  jsonp = (url: string,config?: AxiosRequestConfig) => {
    return request(url, { ...config, adapter: jsonAdapter})
}

// 取消请求
const source = Axios.CancelToken.source();

const data = request('/test', {method: 'get', cancelToken: source.token});
source.cancel('Operation canceled by the user.');

