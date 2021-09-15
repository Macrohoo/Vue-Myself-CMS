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
            //遇到属性then，必须返回一个函数方法，因为需要被then()调用
            return async argument => {
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
              const reverse = await returned  //这里的then已经失去了Promise中实例方法then的作用，所以需要我们手动await出来结果赋值给reverse
              //这个argument参数就是then()调用时，then()括号中的回调参数，一个fn，让使用者用起来跟原来的then一样，以为是一个resolve fn
              //这里reverse用await的形式来处理，处理后的结果作为argument(回调函数)的参数来调用，让使用者用起来感觉跟原来的then一样
              return argument(reverse)
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
