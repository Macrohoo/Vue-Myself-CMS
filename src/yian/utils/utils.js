/**
 * 深度克隆
 * @param  {[type]} obj [description]
 * @return {[type]}          [description]
 */
function deepClone(obj) {
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return obj
  }
  const o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
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
    return obj
  }

  // 如果obj被击中，则为圆形结构
  const hit = find(cache, (c) => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // 先把副本放到缓存里
  // 因为我们想在copyData递归中引用它
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach((key) => {
    copy[key] = copyData(obj[key], cache)
  })

  return copy
}

// 时间处理
function getDateDiff(timespan) {
  var dateTime = new Date(timespan)
  var year = dateTime.getFullYear()
  var month =
    dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1
  var day = dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
  var hour = dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()
  var minute = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()
  var seconds = dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds()
  var now = new Date()
  var nowNew = now.getTime()
  var milliseconds = 0
  var timeSpanStr
  milliseconds = nowNew - dateTime

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚'
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + '分钟前'
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 3) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 3 && year === now.getFullYear()) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
  }
  return timeSpanStr
}

/**
 * 判断你是否为空
 * @param  {[type]} $obj [description]
 * @return {[type]}      [description]
 */
function empty($obj) {
  // 检验非数组/对象类型  EX：undefined   null  ''  根据自身要求添加其他适合的为空的值  如：0 ,'0','  '  等
  if (!$obj && $obj !== 0 && $obj !== '') return true
  if (typeof $obj === 'string') {
    // 移除字符串中所有 ''
    $obj = $obj.replace(/\s*/g, '')
    if ($obj === '') return true
  }
  return (
    (Array.isArray($obj) && $obj.length === 0) ||
    (Object.prototype.isPrototypeOf($obj) && Object.keys($obj).length === 0)
  )
}

/**
 * 数组，字符串去重
 * @param {[Array,String]} params
 * @returns
 */
function unique(params) {
  if (this.getTypeOf(params) === 'Array') {
    return [...new Set(params)]
  }
  if (this.getTypeOf(params) === 'String') {
    const obj = {}
    let str = ''
    for (let i = 0, len = params.length; i < len; i++) {
      if (obj[params[i]]) {
        str += params[i]
        obj[params[i]] = true
      }
    }
    return str
  }
}

/**
 * 手机号校验
 * @param {String} mobile [手机号字符串]
 * @returns true or false
 */
function mobileCheck(mobile) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  return reg.test(mobile)
}

/**
 * Unix时间戳转化日期时间
 * @param targetTime 目标时间或 null 则为当前时间
 * @param format 日期分隔符，空字符则为中文
 * @param showTime 是否显示时间
 * @param showYear 是否显示年份
 * @param showSecond 是否显示秒
 * @returns {string}
 */
function unixDate(
  targetTime = null,
  { format = '', showTime = false, showYear = true, showSecond = false } = {}
) {
  let time
  const date = [
    '0', // 年
    '0', // 月
    '0', // 日
    '0', // 时
    '0' // 分
  ]
  if (targetTime === null) {
    time = new Date()
  } else {
    time = new Date(+targetTime * 1000)
  }

  date[0] = `${time.getFullYear()}`.padStart(2, '0')
  date[1] = `${time.getMonth() + 1}`.padStart(2, '0')
  date[2] = `${time.getDate()}`.padStart(2, '0')
  date[3] = `${time.getHours()}`.padStart(2, '0')
  date[4] = `${time.getMinutes()}`.padStart(2, '0')
  date[5] = `${time.getSeconds()}`.padStart(2, '0')

  let result = ''
  if (showYear) {
    result += date[0] + (format === '' ? '年' : format)
  }
  if (format === '') {
    result += `${date[1]}月${date[2]}日`
  } else {
    result += [date[1], date[2]].join(format)
  }
  if (showTime && !showSecond) {
    result += ` ${[date[3], date[4]].join(':')}`
  } else if (showTime && showSecond) {
    result += ` ${[date[3], date[4], date[5]].join(':')}`
  }
  return result
}

/**
 * 是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 事件绑定
 * @param {Object} element  [绑定dom]
 * @param {String} event    [事件类型]
 * @param {Function} listener [方法]
 */
function addEvent(element, event, listener, capture = false) {
  if (element.addEventListener) {
    element.addEventListener(event, listener, capture)
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, listener)
  } else {
    element['on' + event] = listener
  }
}

/**
 * 获取第一个对象key值
 * @param  {Object}  data     [description]
 * @return {[type]}           [description]
 */
function getShift(data) {
  if (data) {
    return Object.keys(data).shift()
  } else {
    return false
  }
}

/**
 * 创建Vue定制实例，通过new Vue.extend()
 * @param {Function} Component
 * @param {Object} props
 * @param {Object} options
 * @param {Object} options.parent -外壳节点通常是父组件和子组件的关联，用于保存一些父组件传给子组件的数据
 * @param {Object} options.data -选项中的data
 * @param {Object} options.el -选项中的el,实例化时存在这个选项，实例将立即进入编译过程，否则需要显式调用 vm.$mount()手动开启编译
 * @returns {[type]}
 */
function getInstance(Component, props = {}, options = {}) {
  const instance = new Component({
    propsData: props,
    parent: options.parent || null,
    data() {
      return options.data || {}
    },
    el: options.el || document.createElement('div')
  })
  return instance
}

export default {
  deepClone,
  getInstance,
  copyData,
  getDateDiff,
  empty,
  unique,
  mobileCheck,
  unixDate,
  isExternal,
  addEvent,
  getShift
}
