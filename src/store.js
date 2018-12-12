import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showTab: true,
    token: ''
  },
  action: {

  },
  mutations: {
    change(state) {
      state.showTab = !state.showTab
    },
    addToken(state, e) {
      state.token = e
    }
  },
  getters: {

  },
  modules: {

  }
})
export default store
