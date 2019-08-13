import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
		user: null,
    title : 'original',
    isAdmin:false,
    user_authority: '',
<<<<<<< HEAD
<<<<<<< HEAD
    alarm : 0,
=======
    alarm : -1,
    email:"undefine",
>>>>>>> 37703a9152812a309a26322309875ca07ebe3799
=======
    alarm : -1,
    email:"undefine",
>>>>>>> 50375039b4ff8b53a63a0348ed8c9537502bac79
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
      state.alarm=-1
    },

    setalarm(state,x){
      state.alarm=x;
    }

  },
  actions: {
  },
})
