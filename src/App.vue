<template>
  <v-app style="background-color : white">
    <Header>
    </Header>
      <transition name="page">
        <v-content>
          <router-view  :key="$route.fullPath"></router-view>
        </v-content>
      </transition>
    <Footer>
    </Footer>
  </v-app>
</template>

<script>  
import FirebaseService from '@/services/FirebaseService'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import firebase from 'firebase/app'

export default {
  name: 'App',
  
  components: {
    Header,
    Footer
  },
  methods: {

  },
  //   mounted(){
  //   this.item = this.$route.params.item;
  //   console.log("mount start")
  //   console.log(this.item)
  //   FirebaseService.logging(this.item);
  // },
  data () {
    return {
      //
      num:0
    }
  },

  watch: {
    '$route'(){
      this.getNumOfAlarms()
    }
  },
  methods:{
     getNumOfAlarms(){
      if(this.$store.state.user.email == 'undefine'){
        return
      }
      else{
          FirebaseService.getNumOfAlarms(this.$store.state.user.email).then(res=>{
            this.$store.commit('setAlarm',res)
          })
      }
     
    }
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap&subset=korean');

@import "./assets/css/markdown.css";

body{
  font-family: 'Nanum Gothic', sans-serif;
}
.page-enter-active, .page-leave-active {
transition: opacity .5s;
}
.page-enter, .page-leave-to /* .page-leave-active below version 2.1.8 */ {
  opacity: 0;
}

code{
  -webkit-box-shadow:none;
  box-shadow:none;
  color: white;
  font-weight:400;
  line-height:150%;
}

code::before{
  content:'';
}

</style>
