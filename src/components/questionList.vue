<template>
  <v-container>
    <nav>
      <v-toolbar flat color="#FAFAFA" height="50">
        <v-toolbar-title>
          <span class="title">Question with bounties in {{text}}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn-toggle v-model="text">
          <v-btn text value="AI" v-on:click="viewpost('AI')" flat>AI</v-btn>
          <v-btn text value="BigData" v-on:click="viewpost('Bigdata')" flat>BigData</v-btn>
          <v-btn text value="BlockChain" v-on:click="viewpost('Blockchain')" flat>BlockChain</v-btn>
          <v-btn text value="Web/Mobile" v-on:click="viewpost('Webmobile')" flat>Web/Mobile</v-btn>
        </v-btn-toggle>
      </v-toolbar>
      <span class="hr-line"></span>
    </nav>
            <div v-show="postitem=='AI'">    
            <PostList 
            :item="'AI'" 
            :limits="3" 
            :load-more="true"></PostList>
            </div>

            <div v-show="postitem=='Bigdata'">
            <PostList 
            :item="'Bigdata'" 
            :limits="3" 
            :load-more="true"></PostList>
            </div>

            <div v-show="postitem=='Blockchain'">
            <PostList 
            :item="'Blockchain'" 
            :limits="3" 
            :load-more="true"></PostList>
            </div>

            <div v-show="postitem=='Webmobile'">
            <PostList 
            :item="'Webmobile'" 
            :limits="3" 
            :load-more="true"></PostList>
            </div>

    <nav>
      <v-toolbar flat color="#FAFAFA" height="50">
        <v-toolbar-title>
          <span class="title">developer</span>
        </v-toolbar-title>
      </v-toolbar>
      <span class="hr-line"></span>
    </nav>

     <infinite-slide-bar>
      <div class="columns">
        <div class="column" v-for="coin in coins" :key="coin.key">
          <div class="f-left pd-t-8px mg-r-10px">
            <v-img :src="this.user.img"></v-img>
          </div>
          <div class="f-left">
            <div class="f-w-bold">{{this.user.email}}</div>
            <div>
              {{this.user.giturl}}
            </div>
          </div>
        </div>
      </div>
    </infinite-slide-bar>

  </v-container>
</template>

<script>

import PostList from '../components/MainPostList .vue'

import FirebaseService from '@/services/FirebaseService'
import questionCom from "./questionCom";
import InfiniteSlideBar from 'vue-infinite-slide-bar'

export default {
  components: {
    questionCom,
    PostList,
    InfiniteSlideBar,
  },
  created:function(){
    FirebaseService.logging('main..');
    this.getUser()
  },
	mounted() {
	},
  data() {
    return {
      text: "AI",
      postitem:"AI",
    };
  },
  methods: {
    showList(subject) {
      if (subject === "ALL") {
        //console.log("gg");
      }
    },
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
  }
};
</script>

<style scoped>
.ib {
  display: inline;
}

.hr-line {
  display: flex;
  width: 100%;
  height: 2px;
  background: black;
  justify-content: center;
}
</style>
