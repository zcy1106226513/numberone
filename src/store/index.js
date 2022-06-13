import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from './modul_user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  modules: {
    user: moduleUser
  }
})
