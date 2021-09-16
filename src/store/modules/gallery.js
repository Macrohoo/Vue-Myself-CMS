function casGroups (arr) {
  arr.forEach(v => {
    v.value = v.id
    v.label = v.name
    for (const i in v) {
      if(i !== 'value' && i !== 'label' && i !== 'children') {
        delete v[i]
      }
    }
    if(v.children) {
      casGroups(v.children)
    }
  })
  return arr
}

const state = {
  groups: [],
  materials: [],
  cascaderGroups: []
};

const mutations = {
  SET_GROUPS: (state, groups) => {
    state.groups = groups;
  },
  SET_MATERIALS: (state, materials) => {
    state.materials = materials;
  },
  SET_CASCADERGROUPS: (state, copyGroups) => {
    state.cascaderGroups = casGroups(copyGroups)
  }
};

const actions = {
  //获取所有素材分组
  handleGroups({ commit }) {
    return new Promise((resolve, reject) => {
      this._vm.$yian
        .gallery('get', { include: 'group' })
        .then((res) => {
          res.data.forEach((element) => {
            element.cancelVisible = false; //删除重复确认属性
          });
          commit('SET_GROUPS', res.data);
          const copyGroups = this._vm.$yian.utils.copyData(res.data)
          commit('SET_CASCADERGROUPS', copyGroups)
          console.log(res);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //获取全部素材
  handleMaterials({ commit }, page) {
    return new Promise((resolve, reject) => {
      this._vm.$yian
        .gallery('get', { include: 'material' })
        .page({ currentPage: page.page, pageSize: page.size })
        .then((res) => {
          //console.log(res)
          commit('SET_MATERIALS', res.data.rows);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //创建素材分组
  // handleAddGroup({commit}, data) {
  //   return new Promise((resolve, reject) => {
  //     this._vm.$yian.gallery('post', {include: 'group'}, {name: data.value}).then(res => {

  //     })
  //   })
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
