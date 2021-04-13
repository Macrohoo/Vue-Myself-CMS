import store from '@/store'

// 自定义指令（权限按钮指令v-roleBtn)

export default {
  install(Vue) {
    Vue.directive('roleBtn', {
      componentUpdated: function(el, binding) {
        const btnId = binding.value
        const userInfoBtn = store.getters.permissionButton
        const userRole = store.getters.role
        if (userInfoBtn.indexOf(btnId) !== -1 || userRole === '超级管理员') {
          return false
        } else if (userInfoBtn.indexOf(btnId) == -1 && el.parentNode) {
          el.parentNode.removeChild(el)
        } else {
          return false
        }
      }
    })
  }
}
