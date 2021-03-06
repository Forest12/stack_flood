import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
		user: null,
    title : 'original',
    isAdmin:false,
    user_authority: '',
    alarm : 0,
    email:"undefine",
    curtag:[],
  },
  mutations: {
    setTitle(state, p){
      state.title = p
    },
    setUser(state, user){
      state.user = user
    }, 
    setEmail(state, email){
      state.email = email
    },
    setAdmin(state,user){
      console.log(user,'유저확인')
      if (user.displayName == 'admin' || user.displayName=='manager'){
        state.isAdmin = true
      }
    },
    setLogOut(state){
      state.isAdmin = false
      state.email="undefine"
      state.user=null
    },

    setAlarm(state,x){
      state.alarm=x;
    },
  },
  actions: {
  },
})
