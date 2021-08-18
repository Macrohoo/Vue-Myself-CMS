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


export default {
  deepClone,
  getInstance
}
