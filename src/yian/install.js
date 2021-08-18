import icon from './components/icon/index.vue'

export default function install(Vue) {
  Vue.component('svg-icon', icon)  //icon全局注册移入这个封装入口

  const req = require.context('@/icons/svg', false, /\.svg$/)
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  requireAll(req)

}
