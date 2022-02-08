
import Axios from 'axios';
// import axiosRetry from 'axios-retry';

const client = Axios.create({
    // 你的配置
})

// axiosRetry(client, { retries: 1 })

client.interceptors.response.use( (res) => {
    return res;
})

const request = async (url) => {
    const response = await client.request({ url });
    // const result = response.data;
    // // 你的业务逻辑

    // return result;
    return Promise.resolve('');
}

const data = request('http://example.com/test')