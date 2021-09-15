import axios from 'axios';

// Store the requested data
const cache = {
  data: {},
  set(key, data) {
    this.data[key] = data;
  },
  get(key) {
    return this.data[key];
  },
  clear(key) {
    delete this.data[key];
  }
};

// 建立唯一的urlkey值
const buildUniqueUrl = (url, method, params = {}, data = {}) => {
  const paramStr = obj => {
    if (toString.call(obj) === '[object Object]') {
      return JSON.stringify(
        Object.keys(obj)
          .sort()
          .reduce((result, key) => {
            result[key] = obj[key];
            return result;
          }, {})
      );
      // 提供一个初始值空对象作为reduce()方法的第二个参数
    }
    return JSON.stringify(obj);
  };
  url += `?${paramStr(params)}&${paramStr(data)}&${method}`;
  return url;
};

// 防止重复请求
export default (options = {}) => async config => {
  const defaultOptions = {
    time: 0, // 设置为0，不清除缓存
    ...options
  };
  const index = buildUniqueUrl(config.url, config.method, config.params, config.data);
  let responsePromise = cache.get(index);
  if (!responsePromise) {
    responsePromise = (async () => {
      try {
        const response = await axios.defaults.adapter(config);
        return Promise.resolve(response);
      } catch (reason) {
        cache.clear(index);
        return Promise.reject(reason);
      }
    })();
    cache.set(index, responsePromise);
    if (defaultOptions.time !== 0) {
      setTimeout(() => {
        cache.clear(index);
      }, defaultOptions.time);
    }
  }
  return responsePromise.then(data => JSON.parse(JSON.stringify(data))); // 为防止数据源污染
};

// 这里可能会对config产生疑问，因为在axios中adapter作为适配器允许使用者自定义请求处理，它是一个function见下，且在源代码中执行顺序，此时config已经完成了合并。
// Detail See: https://github.com/axios/axios/blob/master/lib/adapters/README.md
// adapter: function (config) {
//   /* ... */
// }
