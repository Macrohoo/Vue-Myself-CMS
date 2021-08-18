import service from './request'
import { Loading } from 'element-ui';  //全局进度条引入
import cache from './cache'
/**
 *
 * @param {String} url [请求地址]
 * @param {Object} params [query or body]
 * @param {Object} options [loading加载是否开启]
 * @param {String} method [请求方式]
 */
function request(url,params,options={loading:true},method) {
  let loadingInstance
  if(options.loading && method.toLowerCase() === 'get') loadingInstance = Loading.service({
    fullscreen: true,
    text: '努力加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return new Promise((resolve, reject) => {
    let data = {}
    if(method.toLowerCase() === 'get') data = {params}
    if(method.toLowerCase() === 'post') data = {data: params}
    service({
      url,
      method,
      ...data,
      adapter: cache({
        time: 1000
      })
    }).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    }).finally(() => {
      loadingInstance.close()
    })
  })
}

function get (url, params, options) {
  return request(url, params, options, 'get')
}

function post (url, params, options) {
  return request(url, params, options, 'post')
}

export default {
  get,
  post
}
