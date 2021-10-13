import icon from './components/icon/index.vue'
import popups from './popups/index'
import upload from './components/upload/index.vue'
import yacheckbox from './components/input/YaCheckbox.vue'

export default function install(Vue) {
  Vue.directive('popup', popups.popup)

  Vue.component('svg-icon', icon) // icon全局注册组件

  Vue.component('ya-upload', upload) // 上传组件

  Vue.component('ya-checkbox', yacheckbox)
}
