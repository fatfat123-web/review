import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localStorage.getItem('userInfo') || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters:{
    token: state => state.token,
  }
})
