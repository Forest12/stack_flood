<template>
  <div>
    <!-- Img Banner -->


    <!-- Post list -->
    <v-container>
        <v-btn v-if="user_check" @click="newPost"  color="#FFA500" dark ><v-icon dark left small>fas fa-plus</v-icon>New</v-btn>
        <v-layout>
        <v-flex xs12>
            <PostList :item="item" :limits="10" :load-more="true"></PostList>
            <h2>{{item}}</h2>
        </v-flex>
      </v-layout>
      
    </v-container>
  </div>
</template>

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
