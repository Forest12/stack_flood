<template>
  <v-toolbar color="#084035">
    <router-link style="width:150px" to="/">
       <ssafy ></ssafy> 
    </router-link>

    <v-toolbar-title>{{$store.state.user ? $store.state.user.email + '님 반갑습니다.' : '1,2,3의 홈페이지 입니다.'}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          router to="/admin"
          flat
          color="pink"
          dark
          v-on="on"
          :class="{notAdmin: !$store.state.isAdmin}"
        >
          Admin Page
        </v-btn>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          color="white"
          dark
          v-on="on"
        >
          Gallery
        </v-btn>
      </template>
      
      <v-list  v-for="i in items" :key="i">
        <v-list-tile @click="go_path(i.item)">
          <v-list-tile-title >{{ i.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
      <v-btn flat color="white" dark to="/portfolio">post</v-btn>
      <v-btn flat color="white" dark to="/portfolio">profile</v-btn>
      <Login>
      </Login>
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
import Login from './Login'
import ssafy from './ssafy'
import FirebaseService from '../services/FirebaseService'

export default {
  name:'Navbar',
  data () {
      return {
        homepage : '/',
        items: [
        { title: 'AI', item :'AI' },
        { title: 'BigData', item :'Bigdata' },
        { title: 'BLockChain', item :'Blockchain' },
        { title: 'Web&Mobile', item :'Webmobile' }
      ],
      path_item: "",
      isAdmin: false,
      }
    },
    computed: {
      
      }, 
    components: {
      ssafy,
        Login,
     },
    methods : {
      go_path(item){
        this.$router.push(`/post/${item}`);
      },
    },


}
</script>

<style scoped>
.ssafy-logo{
  width:150px;
  transition: all 1s;
  /* height:200px; */
}

.ssafy-logo:hover {
  cursor: pointer;
  opacity:0.6;
}

.notAdmin{
  display: none;
}
</style>