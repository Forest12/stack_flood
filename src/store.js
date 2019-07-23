import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
		user: null,
    title : 'original'
  },
  mutations: {
    setTitle(state, p){
      state.title = p
    },
    setUser(state, user){
      state.user = user
    }
  },
  actions: {

  }
})
