function casGroups(arr) {
  arr.forEach((v) => {
    v.value = v.id;
    v.label = v.name;
    for (const i in v) {
      if (i !== 'value' && i !== 'label' && i !== 'children') {
        delete v[i];
      }
    }
    if (v.children) {
      casGroups(v.children);
    }
  });
  return arr;
}

const state = {
  groups: [],
  materials: [],
  cascaderGroups: [],
  containGroups: [], //主视窗的文件夹图
  containMaterials: [], //主视窗的素材图
  containPagesCount: Number,
};

const mutations = {
  SET_GROUPS: (state, groups) => {
    state.groups = groups;
  },
  SET_MATERIALS: (state, materials) => {
    state.materials = materials;
  },
  SET_CASCADERGROUPS: (state, copyGroups) => {
    state.cascaderGroups = casGroups(copyGroups);
  },
  SET_CONTAINGROUPS: (state, data) => {
    state.containGroups = data;
  },
  SET_RESETCONTAINGROUPS: (state, data) => {
    state.containGroups = data; //只有点击全部素材组的时候才触发这个同步数据
  },
  SET_CONTAINMATERIALS: (state, data) => {
    state.containMaterials = data;
  },
  SET_RESETCONTAINMATERIALS: (state, data) => {
    state.containMaterials = data; //只有点击全部素材组的时候才触发这个同步数据
  },
  SET_CONTAINPAGESCOUNT: (state, data) => {
    state.containPagesCount = data;
  },
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
          const copyGroups = this._vm.$yian.utils.copyData(res.data);
          commit('SET_CASCADERGROUPS', copyGroups);
          //console.log(res);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //获取全部素材 仅gallery组件初始时或点全部时调用(定格用)
  createMaterials({ commit }, page) {
    return new Promise((resolve, reject) => {
      this._vm.$yian
        .gallery('get', { include: 'material' })
        .page({ currentPage: page.page, pageSize: page.size })
        .then((res) => {
          commit('SET_CONTAINPAGESCOUNT', res.data.count);
          commit('SET_MATERIALS', res.data.rows);
          commit('SET_CONTAINMATERIALS', res.data.rows);
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
          console.log(res);
          commit('SET_CONTAINPAGESCOUNT', res.data.count);
          commit('SET_CONTAINMATERIALS', res.data.rows);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //获取素材分组详情接口
  handleSingleGroups({ commit }, data) {
    return new Promise((resolve, reject) => {
      this._vm.$yian
        .gallery('get', { id: data.id }, { include: 'group' })
        .page({ currentPage: data.page, pageSize: data.size })
        .then((res) => {
          console.log(res);
          commit('SET_CONTAINPAGESCOUNT', res.data.materials.count);
          commit('SET_CONTAINGROUPS', res.data.children);
          commit('SET_CONTAINMATERIALS', res.data.materials.rows);
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
