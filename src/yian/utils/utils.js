/**
 * 深度克隆
 * @param  {[type]} obj [description]
 * @return {[type]}          [description]
 */
function deepClone(obj) {
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return obj;
  }
  let o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

/**
 * 获取实例化
 * @param  {[type]} component [description]
 * @param  {Object} props     [description]
 * @param  {Object} data      [description]
 * @param  {[type]} parent    [description]
 * @param  {[type]} el        [description]
 * @return {[type]}           [description]
 */
function getInstance(Component, props = {}, options = {}) {
  let instance = new Component({
    propsData: props,
    parent: options.parent || null,
    data() {
      return options.data || {};
    },
    el: options.el || document.createElement('div')
  });
  return instance;
}

/**
 *这是Vue源码中的深拷贝，非常优雅
 *考虑到圆形结构,深度复制给定对象。
 *这个函数缓存所有嵌套的对象及其副本。
 *如果检测到循环结构，使用缓存副本避免无限循环。
 * @param  {[type]} obj   [description]
 * @param  {Array}  cache [description]
 * @return {[type]}       [description]
 */
 function copyData(obj, cache = []) {
  // 如果obj是不可变值，就返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 如果obj被击中，则为圆形结构
  const hit = find(cache, c => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  //先把副本放到缓存里
  //因为我们想在copyData递归中引用它
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = copyData(obj[key], cache);
  });

  return copy;
}



export default {
  deepClone,
  getInstance,
  copyData
}
