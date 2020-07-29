import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localStorage.getItem('userInfo') || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem('token', token);
    },
  },
  actions: {
  },
  modules: {
  },
  getters:{
    token: state => state.token,
  }
})
