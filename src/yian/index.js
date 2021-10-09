import install from './install.js'
import youstructor from './utils/yonstructor'
import api from './utils/api'
import utils from './utils/utils'
import Vue from 'vue';

export default class yian {
  /**
   * 组建列表
   * @type {Object}
   */
  static components = {};

  static install() {}

  static content(config = {}) {
    // After the content method is called, return an instance of the core structure of yourstructor, and then mount it to the Vue instance method
    return this.get_proxy(config)
  }

  //Proxy Constructor
  static get_proxy(config) {
    var _Proxy = new Proxy(new youstructor(config, this), {
      _validator: {},
      get: function(target, property, receiver) {
        if(property in target) {
          //the instance attributes of youstructor, such as utils
          return target[property]
        } else {
          if(property == 'then') {
            //the logic processing of youstructor's request then method
            let data = utils.copyData(this._validator)
            this._validator = {}
            //Return the (pre-function) that needs to be processed before the then method
            //遇到属性then，必须返回一个函数方法，因为需要被then()调用。
            //！！但then调用后返回的是一个Promise，因为then方法触发返回额函数是一个async函数。不再被代理，因为其他方法proxy代理监听到后返回出的都是当前proxy代理实例
            return async argumentResolve => {
              let returned = new Promise((reslove, reject) => {
                new api(data, target)
                  .then(value => {
                    reslove(value);
                  })
                  .catch(error => {
                    reject(error);
                  });
              });
              //The pre-data is processed first after the execution of 'then'
              const reverse = await returned  //returned只是一个axios请求函数结果被包裹promise
              //reverse结果被await会回调处理出无论是resolve，还是reject的结果，都赋值给reverse。

              //所以这个argumentResolve参数就是then代理再被调用时，then()括号中的回调参数。即Promise实例中的then方法中的一个onResolved任务fn函数。
              //then调用后才被订阅任务推入回调任务onResolvedCallbacks[]，可以去看一下promise源码。
              //真实代码展现应该是比如：this.$yian.gallery(/*..*/).then(reverse => {/*..*/})         reverse => {/*..*/}即argumentResolve回调函数fn
              //所以我们可以用async简写成 await this.$yian.gallery(/*..*/)

              return argumentResolve(reverse)
            }
          } else if (property == 'file' || property == 'upload' || property == 'video') {
            //这里是youstructor的请求方法逻辑处理
            return false
          } else {
            let self = this
            //此处匿名函数不能使用()=>,会导致内部arguments指向的是上一层
            return function() {
              //This step is the core step of processing all other methods before then, performing a proxy on them, and storing the relevant parameters.
              self._validator[property] = arguments || ''
              //方法只要被执行，就返回出一层代理，因为后续还要继续被代理。
              return _Proxy
            }
          }
        }
      }
    })
    return _Proxy
  }

/**
 *
 * @param {String} id [联动组件主模块名称]
 * @param {String} name [联动组件popup指令修饰符名称]
 * @param {Object} component [真实组件选项对象，Vue源码中Vue.component会自动调用 Vue.extend]
 * @returns
 */
  static component(id, name, component) {
    if (id == 'components') {
      Vue.component(name, component);
    } else {
      const key = id + '_' + name;
      if (id && name && component) {
        yian.components[key] = component;
      }
      if (id && name) {
        return yian.components[key] || false;
      }
    }
  }
}

yian.install = install
