import utils from './utils'

class youstructor {
  // 核心构造体
  constructor(config, self) {
    this.self = self
    this.utils = utils
    this.ElementUILoading = config.ElementUILoading
    this.interceptor = config.service
  }

  axios(options) {
    const { url, params, method } = options
    return new Promise((resolve, reject) => {
      let data = {}
      if (method.toLowerCase() === 'get') data = { params }
      if (method.toLowerCase() === 'post') data = { data: params }
      this.interceptor({
        url,
        method,
        ...data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
}

export default youstructor
