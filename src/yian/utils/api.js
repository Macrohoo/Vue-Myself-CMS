import { Loading } from 'element-ui'; // 全局loding圈引入
import cache from './cache';
import * as extend from './apiextend';

export default class api {
  /**
   * @param {*} data [Strip all the methods before then, and the return in the constructor will not be executed when data does not exist]
   * @param {Object} youstructor [Back-injected core structure]
   * @returns
   */
  constructor(data, youstructor) {
    this.youstructor = youstructor;
    if (data) {
      return this.send(data);
    }
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
      const key = Object.keys(data);
      const action = key[0] ?? 'defaulter'; //拿到第一个方法名
      this.basics = extend[action] ?? extend.defaulter; // defaulter是一般请求引入，还有video等需要特殊引入
      this.beforeEach(data).then(value => {
        if (value) {
          const options = {
            url: value.url,
            params: value.data,
            qc: value.options,
            method: value.method
          };
          this.request(options).then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          });
        } else {
          reject('前置操作错误!');
        }
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * axios外侧第一层封装请求体，设置成实例方法，为了content定制interceptor
   * @param {Object} options [url请求地址, params请求body或者请求主query, qc配置信息{loading加载是否开启}, method请求方式]
   */
  request(options) {
    const {
      url, params, qc = { loading: false }, method, headers = {'content-type': 'application/json'}
    } = options;
    let loadingInstance;
    if (qc.loading && method.toLowerCase() === 'get') {
      loadingInstance = Loading.service({
        fullscreen: true,
        text: '努力加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
    return new Promise((resolve, reject) => {
      let data;
      if (method === 'get' || method === 'delete') data = { params };
      if (method === 'post' || method === 'put') data = { data: params };
      this.youstructor.interceptor({
        url,
        method,
        ...data,
        headers,
        adapter: cache({
          time: 1000
        })
      }).then(res => {
        resolve(res);
      }).catch(err => {
        console.log(err);
        reject(err);
      }).finally(() => {
        if (method.toLowerCase() === 'get') {
          loadingInstance.close();
        }
      });
    });
  }
}
