import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
  bottomNav: 1,
  token:''
}

var mutations = {
  changeBottomNav(state, value) {
    state.bottomNav = value;
  },
  setToken(state, token) {
    state.token = token
    localStorage.setItem("token",token)
  },
  delToken(state) {
    state.token = ''
    localStorage.removeItem('token')
  }
}

//vuex  实例化 Vuex.store
const store = new Vuex.Store({
  state,
  mutations
})


export default store;
