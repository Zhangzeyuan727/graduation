import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showTab: true,
    token: '',
    //图书详情来源
    from: ''
  },
  action: {

  },
  mutations: {
    change(state) {
      state.showTab = !state.showTab
    },
    addToken(state, e) {
      state.token = e
    },
    changeDetailFrom(state, param) {
      state.from = param
    }
  },
  getters: {

  },
  modules: {

  }
})
export default store
