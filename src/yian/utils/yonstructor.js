import utils from './utils'
import Cookies from 'js-cookie'
import api from './api'

class cloud {
  //核心构造体
  constructor(config, self) {
    this.utils = utils
    this.get = api.get
    this.post = api.post
  }

  getToken() {
    return Cookies.get(TokenKey)
  }

  setToken(token) {
    return Cookies.set(TokenKey, token)
  }

  removeToken() {
    return Cookies.remove(TokenKey)
  }


}

export default cloud
