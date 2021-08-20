import utils from './utils'
import Cookies from 'js-cookie'
import api from './api'

class youstructor {
  //核心构造体
  constructor(config, self) {
    this.self = self
    this.utils = utils
    this.request = api.request
    this.ElementUILoading = config.ElementUILoading
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

export default youstructor
