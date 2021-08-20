// import axios from 'axios'
// import { Message } from 'element-ui'
// import { getToken, removeToken, setToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API,
//   //baseURL: '/api',
//   withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000
// })

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     if (getToken()) {
//       config.headers.Authorization = `Bearer ${getToken()}`
//       // config.headers['Bearer '] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     // console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(
//   ({ status, data }) => {
//     if (status == 200 && data.code == 11000) {
//       //refreshtoken
//       setToken(data.data.access_token)
//       location.reload()
//     } else if (status == 200 && (data.code == 10020 || data.code == 10404 || data.code == 10204 || data.code == 10020 )) {
//       Message({
//         message: data.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       return false   //这里也可以不return false ，那么在组件中就是回调结果是一个undefined，都需要用if(回调存在)去做成功操作的toast。
//     } else if (status == 200 && data.code == 10030) {
//       Message({
//         message: data.message.warn,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       return false
//     } else if (status == 200 && data.code == 10402) {
//       Message({
//         message: data.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       removeToken()
//       location.reload();
//     } else {
//       return Promise.resolve(data);
//     }
//   },
//   // (response) => {
//   //   return Promise.resolve(response.data)
//   // },
//   error => {
//     //如果不是服务器内部错误，error响应数据会被赋值给response字段
//     if (error.response.status == 401 && error.response.data.code == 10000) {
//       Message({
//         message: error.response.data.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       removeToken()
//       location.reload();
//     } else {
//       return Promise.reject(error)  //如果是服务器内部错误，直接异步抛出，在组件中会catch
//     }
//   }
// )

// export default service
