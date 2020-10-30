import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import localStorage from './localStorage'
import i18n from '../lang/index'


let service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 30000
})
// request拦截器
service.interceptors.request.use(config => {
  const whiteList = ['dl-upms/upms/userConfig/global/defaultTenantId']
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || ''
  if (token) {
    config.headers = {
      'Authorization': 'Bearer ' + token,
      'lang': i18n.locale
    }
    if (!whiteList.includes(config.url)) {
      const tenantId = window.localStorage.getItem('tenantId') || window.sessionStorage.getItem('tenantId') || ''
      config.headers.tenant = tenantId
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
      // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
      if (res.code === 1001 || res.code === 1002 || res.code === 5004) {
        if (response.headers['X-LEAN_TOKEN']) {
          store.dispatch('refyrToken', response.headers['X-LEAN_TOKEN'])
        } else {
          Message({
            message: res.message,
            type: 'error',
            duration: 3 * 1000
          })
          store.dispatch('clearInfo')
        }
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
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
