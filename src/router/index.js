import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import wangEditor from '@/components/Editor/wangEditor'
import tuiEditor from '@/components/Editor/tuiEditor'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

// 所有权限通用路由表,如首页和登录页和一些不用权限的公用页面

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Tool Components',
    meta: { title: 'Tool', icon: 'el-icon-folder-opened' },
    children: [
      {
        path: 'tuiEditor',
        name: 'tuiEditor',
        component: tuiEditor,
        meta: { title: 'tuiEditor', icon: 'el-icon-s-help' }
      },
      {
        path: 'wangEditor',
        name: 'wangEditor',
        component: wangEditor,
        meta: { title: 'wangEditor', icon: 'el-icon-s-help' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/Marhooo/vue-blog-cms',
        meta: { title: 'Github', icon: 'github' }
      }
    ]
  }

]

export const asyncRouters = [
  {
    r_id: ['100022'],
    path: '/article',
    name: '文章管理', // 'Article'
    component: Layout,
    meta: { title: '文章管理', icon: 'el-icon-tickets', role: ['超级管理员', '管理员', '游客'] },
    children: [
      {
        r_id: ['100023'],
        path: 'addArticleEditor',
        name: '发表文章', // 'PublishArticle'
        component: () => import('@/views/article/addArticleEditor'),
        meta: { title: '发表文章', icon: 'form', role: ['超级管理员', '管理员', '游客'] }
      },
      {
        r_id: ['100024'],
        path: 'articleList',
        name: '文章列表', // 'ArticleList'
        component: () => import('@/views/article/articleList'),
        meta: { title: '文章列表', icon: 'form', role: ['超级管理员', '管理员', '游客'] }
      },
      {
        r_id: ['100025'],
        path: 'commentList',
        name: '评论列表', // 'CommentList'
        component: () => import('@/views/article/commentList'),
        meta: { title: '评论列表', icon: 'form', role: ['超级管理员', '管理员', '游客'] }
      }
    ]
  },

  {
    r_id: ['100000'],
    path: '/systemManage',
    name: '系统管理', // 'SystemManage'
    component: Layout,
    meta: { title: '系统管理', icon: 'el-icon-s-tools', role: ['超级管理员', '管理员', '游客'] },
    children: [
      {
        r_id: ['100005'],
        path: 'roleManage',
        name: '角色权限管理', // 'RoleManage'
        component: () => import('@/views/systemManage/roleManage'),
        meta: { title: '角色权限管理', icon: 'el-icon-edit', role: ['超级管理员', '管理员', '游客'] },
        children: [
          {
            r_id: ['btn_100002'],
            name: 'Btn_角色增加',
            path: '/roleManage', // 路由重定到上一级无所谓
            type: 'button',
            hidden: true, // 不在侧边栏线上
            children: []
          }
        ]
      },
      {
        r_id: ['100026'],
        path: 'userMange',
        name: '用户管理', // 'UserMange'
        component: () => import('@/views/commerViews'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid', role: ['超级管理员', '管理员', '游客'] },
        children: [
          {
            r_id: ['100029'],
            path: 'userList',
            name: '用户列表', // 'UserList'
            component: () => import('@/views/user/userList'),
            meta: { title: '用户列表', icon: 'el-icon-thumb', role: ['超级管理员', '管理员', '游客'] },
            children: []
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
