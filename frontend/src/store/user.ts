import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 0,
    username: '',
    nickname: '',
    avatar: '',
  },
  mutations: {
    setUser(state, user) {
      state.userId = user.id;
      state.username = user.username;
      state.nickname = user.nickname;
      state.avatar = user.avatar;
    }
  },
  actions: {
  },
  modules: {
  }
})
