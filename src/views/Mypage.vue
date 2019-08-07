<template>
  <div>
    <!-- Img Banner -->


    <!-- Post list -->
    <v-container>
        <v-layout>
        <v-flex xs12>
            <h2>MY Page</h2>
            <br><br><br>
            
             <v-flex xs11>
                <v-img :src="user[0].img" height="23vh" width="23vh" style="float:left; margin-left:7%"></v-img>
                <!-- 여기에 이미지 업로더 들어가기 -->
                <h2 style="margin-left : 30%">    Your Email :   {{user[0].email}}    </h2>
                <h3 style="margin-left : 30%"> 좋아요 합산 : 싫어요 합산 :</h3>
            </v-flex>  
            <div style="clear: both; height: 0; overflow: hidden;"> </div>
            <br>
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

import ImageUploader from '../components/ImageUploader'

import FirebaseService from '@/services/FirebaseService'
import { METHODS } from 'http';

export default {
    name: 'Mypage',
    data(){
        return{
            user:'',
        }
    },
    
    created:function(){
    console.log('created mypage')
    FirebaseService.logging('mypage');
    console.log("getuser start")
    this.getUser()
  },

	components: {
    PostList,
    ImageUploader,
  },
  methods:{
    async getUser() {
            this.user = await FirebaseService.getUser()
        },
  }
}
</script>
