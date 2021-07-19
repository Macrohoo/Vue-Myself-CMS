import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 顶部进度条控件
import 'nprogress/nprogress.css' // nprogress样式必须引入
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { asyncRouters } from '@/router/index'

NProgress.configure({ showSpinner: false }) // 配置showSpinner：进度环显示隐藏

const whiteList = ['/login'] // no redirect whitelist

const elTree = JSON.parse(JSON.stringify(asyncRouters)) // 深拷贝原始动态路由表

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title JS中的document.title可以获取当前网页的标题 web api
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get userinfo并放入store中
          store.dispatch('user/getInfo').then(res => {
            const data = {}
            if (res.role) {
              data.roles = res.role.split(' ')
            }
            let authorityRouter = []
            let permissionButton = []
            if (res.authorityRouter) {
              authorityRouter = res.authorityRouter.split(',')
            }
            if (res.permissionButton) {
              permissionButton = res.permissionButton.split(',')
            }
            data.pageBtn_permission = permissionButton.concat(authorityRouter)
            store.commit('routerpermission/SET_ROLETREE', elTree)
            store.dispatch('routerpermission/GenerateRoutes', data).then(() => {
              router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
              NProgress.done()
            })
          })
          // console.log(store.getters.roleTree)
          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          Message({
            message: error.message || 'Has Error',
            type: 'error',
            duration: 5 * 1000
          })
          store.dispatch('user/resetToken')
          router.replace({
            path: '/login'
          })
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
