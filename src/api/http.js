import axios from 'axios'
import store from '../store.js'
let SERVER_BASE_URL = ''


process.env.NODE_EVN === 'development' ? (SERVER_BASE_URL = 'http://192.168.1.172:3002/') : (SERVER_BASE_URL = '')

axios.defaults.withCredentials = true
// console.log(process.env.NODE_EVN)
const http = axios.create({
    baseURL: 'http://192.168.1.172:3002/',
    timeout: 10000,
    headers: {},
})

http.defaults.withCredentials = false

http.interceptors.request.use(
    (config) => {
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config
    },
    (err) => {
        return Promise.reject(err)
    },
)

export default {
    http,
}
