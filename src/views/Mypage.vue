<template>
  <div>
    <!-- Img Banner -->


    <!-- Post list -->
    <v-container v-if="$store.state.user.email">
        <v-layout>
        <v-flex xs12>
            <h2>MY Page</h2>
            <br><br><br>
            
             <v-flex xs11>
                <v-img :src="user.img" height="23vh" width="23vh" style="float:left; margin-left:7%"></v-img>
                <!-- 여기에 이미지 업로더 들어가기 -->
                 <ImageUploader></ImageUploader>

                <h2 style="margin-left : 30%">    Your Email :   {{user.email}}    </h2>

                  <div class="my-2" style="margin-left:30%; ">
                <v-text-field v-model="giturl" label="your git address"
                  filled shaped style="width:20%; display:inline-block" >123{{user.giturl}}</v-text-field>
                  <v-btn text small color="primary"
                  v-on:click="updateUserGit(giturl)">GIT 주소 수정</v-btn>
                </div>

                <h3 style="margin-left : 30%"> 좋아요 합산 : 싫어요 합산 :</h3>
            </v-flex>  
            <div style="clear: both; height: 0; overflow: hidden;"> </div>
            <br>

            <h2>--My Post--</h2>

            <div style="border:2px solid black; border-radius:10px;">

                <div class="my-2" style="display:inline-block">
                  <v-btn text small color="primary"
                  v-on:click="viewpost('AI')">AI</v-btn>
                </div>
                <div class="my-2" style="display:inline-block; margin-left:10px;">
                  <v-btn text small color="primary"
                  v-on:click="viewpost('Bigdata')">Bigdata</v-btn>
                </div>
                <div class="my-2" style="display:inline-block; margin-left:10px;">
                  <v-btn text small color="primary"
                  v-on:click="viewpost('Blockchain')">Blockchain</v-btn>
                </div>
                <div class="my-2" style="display:inline-block; margin-left:10px;">
                  <v-btn text small color="primary"
                  v-on:click="viewpost('Webmobile')">Webmobile</v-btn>
                </div>

            <div v-show="postitem=='AI'">    
            <PostList :item="'AI'" :limits="10" :load-more="true"></PostList>
            </div>

            <div v-show="postitem=='Bigdata'">
            <PostList :item="'Bigdata'" :limits="10" :load-more="true"></PostList>
            </div>

            <div v-show="postitem=='Blockchain'">
            <PostList :item="'Blockchain'" :limits="10" :load-more="true"></PostList>
            </div>

            <div v-show="postitem=='Webmobile'">
            <PostList :item="'Webmobile'" :limits="10" :load-more="true"></PostList>
            </div>
            </div>

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
            postitem:'',
            giturl:'',
        }
    },
    
    created:function(){
    FirebaseService.logging('mypage');
    this.getUser()
  },

	components: {
    PostList,
    ImageUploader,
  },
  methods:{
    async getUser() {
            await FirebaseService.getUser().then
            (res=>{
              this.user=res[0]
            })
            this.giturl=this.user.giturl
        },
        viewpost:function(postitem){
          this.postitem=postitem;
        },
        updateUserGit:function(giturl){
          FirebaseService.update_database_member(
            this.user.email,this.user.user_authority,this.user.level,this.user.img,this.giturl,this.user.created_at);
        alert("Git address changed!!")
       },
  }
}
</script>
