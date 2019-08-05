<template>
  <v-app style="background-color : white">
    <Header>
    </Header>
      <transition name="page">
        <v-content>
          <router-view :key="$route.fullPath"></router-view>
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
  //   mounted(){
  //   this.item = this.$route.params.item;
  //   console.log("mount start")
  //   console.log(this.item)
  //   FirebaseService.logging(this.item);
  // },
  data () {
    return {
      //
    }
  },
  created(){
    
  },

}
</script>

<style>
.page-enter-active, .page-leave-active {
transition: opacity .5s;
}
.page-enter, .page-leave-to /* .page-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
