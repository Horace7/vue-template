import axios from 'axios'
import { Message } from 'element-ui'
import localStorage from './localStorage'
import i18n from '../lang/index'


let service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || ''
  if (token) {
    config.headers = {
      'Authorization': 'Bearer ' + token,
      'lang': i18n.locale
    }
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
       * code:200,接口正常返回;
       */
    const res = response.data

    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error('error')) // 解决Expected the Promise rejection
    } else { // res.code === 200,正常返回数据
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
