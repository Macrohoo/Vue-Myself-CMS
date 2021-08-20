import service from './request'
import { Loading } from 'element-ui';  //全局loding圈引入
import cache from './cache'
import * as extend from './apiextend'

export default class api {
  /**
   * @param {*} data
   * @param {Object} youstructor [反向注入的核心构造体]
   * @returns
   */
  constructor(data, youstructor) {
    this.youstructor = youstructor
    return this.send(data)
  }


  /**
   * 前置操作
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
   beforeEach(value) {
    return new Promise((resolve, reject) => {
      try {
        this.basics.beforeEach(value, resolve, reject, this.youstructor);
      } catch (error) {
        reject(error);
      }
    });
  }


  send(data) {
    return new Promise((resolve, reject) => {
      let key = Object.keys(data)
      let action = key[0] || 'defaulter'
      this.basics = extend[action] || extend['defaulter']  //defaulter是一般请求引入，还有video等需要特殊引入
      this.beforeEach(data).then(value => {
        if(value) {
          let options = {
            url: value.url,
            params: value.data,
            qc: value.options,
            method: value.method
          }
          api.request(options).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else {
          reject('前置操作错误!')
        }
      }).catch(err => {
        reject(err)
      })
    })

  }


  /**
   * axios外侧第一层封装请求体
   * @param {Object} options [url请求地址, params请求body或者请求主query, qc配置信息{loading加载是否开启}, method请求方式]
   */
  static request(options) {
    const {url, params, qc = {loading: false}, method} = options
    let loadingInstance
    if(qc.loading && method.toLowerCase() === 'get') loadingInstance = Loading.service({
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
          time: 10000
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

}
