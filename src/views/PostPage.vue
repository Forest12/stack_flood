<template>
  <div>
    <!-- Img Banner -->


    <!-- Post list -->
    <v-container>
        <v-btn  @click="newPost"  color="#FFA500" dark ><v-icon dark left small>fas fa-edit</v-icon>New</v-btn>
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

import PostList from '../components/PostList.vue'
import { METHODS } from 'http';

export default {
    name: 'PostPage',
    data(){
        return{
            item:""
        }
    },
      created:function(){
    this.item = this.$route.params.item;
    FirebaseService.logging(this.item+" new post");
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
