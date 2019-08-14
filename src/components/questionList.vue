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
      <div>


      <infinite-slide-bar>
      <div class="columns" >
        <div class="column" v-for="coin in developer" :key="coin.key" style="display:inline-block; margin-right:10%;">
          <div class="f-left pd-t-8px mg-r-10px" style="display:inline-block;">
            <div style="display:inline-block;">
            <v-responsive class="pt-1">
             <v-avatar size="70">
               <v-img :src="coin.key" alt=""></v-img>
             </v-avatar>
            </v-responsive>
          </div>
          <div class="f-left">
            <div class="f-w-bold">{{coin.name}}</div>
            <div>
              {{coin.giturl}}
            </div>
          </div>
          </div>

        </div>
      </div>
    </infinite-slide-bar>


      </div>

    </nav>

     

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
  },created:function(){
    FirebaseService.logging('main..');
    this.getUser()
  },
	mounted() {
	},
  data() {
    return {
      text: "AI",
      postitem:"AI",
      
      developer: [{
          name: "임현철",
          giturl:"https://i.imgur.com/BQZtKiI.jpg",
          key:"http://signalkor.com/wp-content/uploads/2018/01/emoticon3.jpg",
        },
        {
          name: "정상영",
          giturl:"https://i.imgur.com/BQZtKiI.jpg",
          key:"data:image/jpeg;base64,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",
        },{
          name: "유승주",
          giturl:"https://i.imgur.com/BQZtKiI.jpg",
          key:"https://steemitimages.com/DQmTYEViN4zYwmdkjBtZrngoUEHsFShhAZeMAdPcfGcYmpq/image.png",
        },]
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
