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
    // content方法调用后,return出youstructor核心构造体的实例，然后挂载到Vue实例方法
    return this.get_proxy(config)
  }

  //代理构造体
  static get_proxy(config) {
    var _Proxy = new Proxy(new youstructor(config, this), {
      _validator: {},
      get: function(target, property, receiver) {
        if(property in target) {
          //这里是youstructor的实例属性，比如utils
          return target[property]
        } else {
          if(property == 'then') {
            //这里是youstructor的请求then方法逻辑处理
            let data = utils.copyData(this._validator)
            this._validator = {}
            //返回在then方法前需要首先处理的(前置函数)
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
              //then执行后首先处理前置数据
              const reverse = await returned
              return argument(reverse)
            }
          } else if (property == 'file' || property == 'upload' || property == 'video') {
            //这里是youstructor的请求方法逻辑处理
            return false
          } else {
            let self = this
            //此处匿名函数不能使用()=>,会导致内部arguments指向的是上一层
            return function() {
              //这步是处理then之前所有其他方法的核心步骤，对它们进行一个代理，并把相关的参数储存起来。
              self._validator[property] = arguments || ''
              //方法只要被执行，就返回出一层代理。
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
