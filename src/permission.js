import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' //顶部进度条控件
import 'nprogress/nprogress.css' //nprogress样式必须引入
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 配置showSpinner：进度环显示隐藏

const whiteList = ['/login'] // no redirect whitelist

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
          //get userinfo并放入store中
          store.dispatch('user/getInfo').then(res => {
            const roles = res.role
            store.dispatch('routerpermission/GenerateRoutes', roles).then(()=>{
              router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
            })            
          })
          //next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
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
