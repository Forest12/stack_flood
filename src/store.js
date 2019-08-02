import Vue from 'vue'
import Vuex from 'vuex'
import FirebaseService from './services/FirebaseService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
		user: null,
    title : 'original',
    isAdmin:false,
    user_authority: '',
  },
  mutations: {
    setTitle(state, p){
      state.title = p
    },
    setUser(state, user){
      state.user = user
    },
    setAdmin(state,user){
      console.log(user,'유저확인')
      if (user.displayName == 'admin'){
        state.isAdmin = true
      }
    }
  },
  actions: {
  },
})
