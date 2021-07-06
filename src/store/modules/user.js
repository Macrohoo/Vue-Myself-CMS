import { fetchLogin, fetchLogout } from '@/api/apis/login'
import { fetchGetUserInfo } from '@/api/apis/user'
import { setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    role: '',
    authorityRouter: '',
    permissionButton: '',
    uid: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_AUTHORITYROUTER: (state, authorityRouter) => {
    state.authorityRouter = authorityRouter
  },
  SET_PERMISSIONBUTTON: (state, permissionButton) => {
    state.permissionButton = permissionButton
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 有时候用户输入信息的时候，可能会过多的填写空格，或者有些时候就使用空格做为数据了，结果造成程序出错~为了使我们的数据紧凑并且不会出现空格错误 我们就需要使用到trim（）函数
      fetchLogin({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token) // 把token放到Cookie中
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // fetchGetUserInfo()  修改 这个API是不携带参数的，所以state是不是也可以去掉，上面的token：getToken()是否应该改成token: '',
      fetchGetUserInfo().then(response => {
        if (!response) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, role, authorityRouter, permissionButton, id } = response.data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLE', role)
        commit('SET_AUTHORITYROUTER', authorityRouter)
        commit('SET_PERMISSIONBUTTON', permissionButton)
        commit('SET_UID', id)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      fetchLogout().then(() => {
        removeToken()
        // resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

