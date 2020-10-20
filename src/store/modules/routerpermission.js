import { constantRoutes, asyncRouters } from "@/router/index";

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0);
  } else {
    return true;
  }
}

const routerpermission = {
  state: {
    routers: constantRoutes,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRoutes.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRouters = asyncRouters.filter(v => {
          if (roles.indexOf("超级管理员") >= 0) return true;
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
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }  
};

export default routerpermission;
