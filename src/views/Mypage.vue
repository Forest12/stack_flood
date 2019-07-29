<template>
  <div>
    <!-- Img Banner -->


    <!-- Post list -->
    <v-container>
        <v-layout>
        <v-flex xs12>
            <h2>MY POST</h2>
            <h3>AI</h3>
            <PostList :item="'AI'" :limits="10" :load-more="true"></PostList>
            <h3>Bigdata</h3>
            <PostList :item="'Bigdata'" :limits="10" :load-more="true"></PostList>
            <h3>Blockchain</h3>
            <PostList :item="'Blockchain'" :limits="10" :load-more="true"></PostList>
            <h3>Webmobile</h3>
            <PostList :item="'Webmobile'" :limits="10" :load-more="true"></PostList>
        </v-flex>
      </v-layout>
      
    </v-container>
  </div>
</template>

<script>

import PostList from '../components/MyPostList.vue'
import { METHODS } from 'http';

export default {
    name: 'Mypage',

      created:function(){
    this.item = this.$route.params.item;
    console.log('created mypage')
  },
	components: {
		PostList,
  },
  methods:{

  }
}
</script>
