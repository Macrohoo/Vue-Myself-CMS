import install from './install.js'
import youstructor from './utils/yonstructor'

export default class yian {
  static install() {}

  static content(config = {}) {
    // content方法调用后,return出youstructor核心构造体的实例，然后挂载到Vue实例方法
    // content方法预留了config配置，后期可以配置
    return new youstructor(config, this)
  }
}

yian.install = install
