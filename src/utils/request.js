import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  //baseURL: '/api', // 暂时写死，后续再调
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    NProgress.start()
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${getToken()}`
      // config.headers['Bearer '] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    // console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    if (error.response.status == 401) {
      store.dispatch('user/resetToken')
      router.replace({
        path: '/login'
      })
    }
    return Promise.reject(error.response.data)
  }
)

export default service
