import { constantRoutes, asyncRouters } from "@/router/index";

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0);
  } else {
    return true;
  }
}

const state = {
  routers: constantRoutes,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutes.concat(routers)
  }  
}

const actions = {
  GenerateRoutes({ commit }, data) {
    const roles = []
    var that = this
    return new Promise(resolve => {
      that.roles = data
      const accessedRouters = asyncRouters.filter(v => {
        if (that.roles.indexOf("超级管理员") >= 0) return true;
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) {
                return child;
              }
              return false;
            });
            return v;
          } else {
            return v;
          }
        }
        return false;
      });
      //console.log(accessedRouters)
      commit("SET_ROUTERS", accessedRouters);
      resolve();
    });
  }  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
