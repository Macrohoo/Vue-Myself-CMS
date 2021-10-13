import utils from './utils'
import cache from './cache'
import { Loading } from 'element-ui'

class youstructor {
  // Core structure
  constructor(config, self) {
    this.self = self
    this.utils = utils
    this.ElementUILoading = config.ElementUILoading
    this.interceptor = config.service
    this.baseVersionApi = config.baseVersionApi
  }

  axios(options) {
    const { url, params, method, headers = { 'content-type': 'application/json' }} = options
    let loadingInstance
    if (this.ElementUILoading && method.toLowerCase() !== 'get') {
      loadingInstance = Loading.service({
        fullscreen: true,
        text: '努力加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    return new Promise((resolve, reject) => {
      let data = {}
      if (method === 'get') data = { params }
      if (method === 'post' || method === 'put' || method === 'delete') data = { data: params }
      this.interceptor({
        url,
        method,
        ...data,
        headers,
        adapter: cache({
          time: 1000
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      }).finally(() => {
        if (method.toLowerCase() !== 'get' && loadingInstance) {
          loadingInstance.close()
        }
      })
    })
  }
}

export default youstructor
