import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from "nprogress"

// create an axios instance
const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/api', //暂时写死，后续再调
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    NProgress.start()
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${getToken()}`
      //config.headers['Bearer '] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    NProgress.done()
    // const res = response.data
    // if (response.status !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
