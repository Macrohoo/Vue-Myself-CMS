import { constantRoutes, asyncRouters } from '@/router/index'

function hasPermission(roles, pageBtn_permission, route) {
  if (route.meta && route.meta.role && route.r_id) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0) && pageBtn_permission.some(role => route.r_id.indexOf(role) >= 0)
  } else {
    return true
  }
}

// el-trees权限路由树结构建立函数
function ToRoleTree(data) {
  data.forEach(element => {
    if (element.r_id) {
      element.r_id = element.r_id.toString()
    }
    delete element.path
    delete element.component
    delete element.meta
    if (element.children) {
      ToRoleTree(element.children)
    }
  })
  return data
}

const state = {
  routers: constantRoutes,
  addRouters: [],
  roleTree: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutes.concat(routers)
  },
  SET_ROLETREE: (state, roleTree) => {
    state.roleTree = ToRoleTree(roleTree)
    state.roleTree.pop() // 删除404页面
  }
}

function filterAsyncRoutes(routes, roles, pageBtn_permission) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route } // 一级解构对象
    if (hasPermission(roles, pageBtn_permission, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles, pageBtn_permission)
      }
      res.push(tmp)
    }
  })

  return res
}

const actions = {
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      let accessedRouters
      const { roles, pageBtn_permission } = data
      if (roles.indexOf('超级管理员') >= 0) {
        accessedRouters = asyncRouters // 当是超级管理员时，所有路由都开放
      } else {
        accessedRouters = filterAsyncRoutes(asyncRouters, roles, pageBtn_permission)
      }
      commit('SET_ROUTERS', accessedRouters)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
