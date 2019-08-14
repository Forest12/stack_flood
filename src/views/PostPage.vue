<template>
  <div class="co">
    <!-- Img Banner -->
    

    <!-- Post list -->
    <!-- <v-container>
        <v-btn v-if="user_check" @click="newPost"  color="#FFA500" dark ><v-icon dark left small>fas fa-plus</v-icon>New</v-btn>
        <v-layout>
        <v-flex xs12>
            <PostList :item="item" :limits="10" :load-more="true"></PostList>
            <h2>{{item}}</h2>
        </v-flex>
      </v-layout>
      
    </v-container> -->
    <v-container class="post-container">
    <v-btn v-if="user_check" @click="newPost"  color="#FFA500" >Ask Question</v-btn>
      <div class="post-box">
        <div class="post-left">
          <h2 class="white--text">{{item}}</h2>
        </div>

        <div class="post-right">
          <v-layout>
          <v-flex xs12>
              <PostList :item="item" :limits="10" :load-more="true"></PostList>
          </v-flex>
        </v-layout>
        </div>
      
      </div>

    </v-container>
  </div>
</template>

<style scoped>
.co{
  display:flex;
  justify-content: center;
}
.post-container {
  margin:20px;
  width:100%;
  /* overflow:auto; */
  /* border:2px solid orange; */
}

.post-box{
  display:flex;
  height:100%;
}

.post-left {
  width:300px;
  float:left;
  background:#2E303E;
}

.post-right {
  width:100%;
  float:left;
}

@media screen and (max-width:1000px) and (min-width:700px){
  
}

@media screen and (max-width: 800px){
  .post-box{
    height:100%;
    width:100%;
    display:block;
  }
  .post-left{
    display:block;
    height:150px;
    width:100%;
    background:#2E303E;
  }
  .post-right {
    width:100%;
    float:left;
  }
}


</style>

<script>
import FirebaseService from '@/services/FirebaseService'

import PostList from '../components/PostList.vue'
import { METHODS } from 'http';

export default {
    name: 'PostPage',
    data(){
        return{
            item:"",
            user_check: false
        }
    },
    created(){
      this.item = this.$route.params.item;
      FirebaseService.logging(this.item+" new post");
      if(this.$store.state.user.displayName != "undefine"){
          this.user_check = true
      }
  },
	components: {
		PostList,
  },
  methods:{
    newPost(){
      this.$router.push(`/post/${this.item}/new`);
    }

  }
}
</script>
