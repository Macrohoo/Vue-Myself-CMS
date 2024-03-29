import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import routerpermission from './modules/routerpermission'
import errorLog from './modules/errorLog'
import gallery from './modules/gallery'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    routerpermission,
    errorLog,
    gallery
  },
  getters
})

export default store
