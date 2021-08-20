import utils from './utils'
import Cookies from 'js-cookie'
import api from './api'

class youstructor {
  //核心构造体
  constructor(config, self) {
    this.self = self
    this.utils = utils
    this.axios = new api().request
    this.ElementUILoading = config.ElementUILoading
    this.interceptor = config.service
    this.tokenKey = config.tokenKey
  }



  getToken() {
    return Cookies.get(this.tokenKey)
  }

  setToken(token) {
    return Cookies.set(this.tokenKey, token)
  }

  removeToken() {
    return Cookies.remove(this.tokenKey)
  }


}

export default youstructor
