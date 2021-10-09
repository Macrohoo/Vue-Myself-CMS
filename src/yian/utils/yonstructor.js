import utils from './utils';
import cache from './cache';

class youstructor {
  // Core structure
  constructor(config, self) {
    this.self = self;
    this.utils = utils;
    this.ElementUILoading = config.ElementUILoading;
    this.interceptor = config.service;
    this.baseVersionApi = config.baseVersionApi
  }

  axios(options) {
    const { url, params, method, headers = {'content-type': 'application/json'} } = options;
    return new Promise((resolve, reject) => {
      let data = {};
      if (method === 'get') data = { params };
      if (method === 'post' || method === 'put' || method === 'delete') data = { data: params };
      this.interceptor({
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
      });
    });
  }
}

export default youstructor;
