<template>
  <v-layout py-4 h-100>
    <v-flex >
      <div row @click="moveDetail" class="post-body-box">
        <!-- <div class="caption ">{{formatedDate}}</div>
        <h2 class="color-333 headline font-weight-light cutoneline">{{title}}</h2>
        <p class="mb-1 color-666 font-weight-light subheading cutfourline">{{content}}</p>
      </div> -->
        <!-- <div class="post-body-box"> -->
          <div class="post-score-box">
            <div class="post-score-votes">
              <div class="center">
                <span class="post-score-num">11 </span>
                <span>votes</span>
              </div>
            </div>

            <div class="post-score-answer">
              <div class="center">
                <span class="post-score-num">27 </span>
                <span>answers</span>
              </div>
            </div>

            <div class="post-score-views">
              <div class="center">
                <span class="post-score-num">8 </span>
                <span>views</span>
              </div>
            </div>

          </div>
          <div class="post-content-box pa-3">
            <div class="post-content-title title blue--text mb-2">
              {{ title }}
            </div>

            <div class="post-content-content">
              {{ content }}
            </div>
          </div>
        <!-- </div> -->
      </div>
    </v-flex>
    
  </v-layout>
</template>

<style scoped>
  .center {
    width:90px;
    position:absolute;
    top:50%;
    left:50%;
    transform : translate(-50%,-50%);
  }
  
  .post-body-box{
    display:flex;
    min-height:200px;
    max-height:400px;
    width:100%;
  }

  .post-score-box{
    flex:left;
    width:100px;
  }

  .post-content-box {
    flex:left;
    width:70%;
  }

  .post-score-votes{
    position:relative;
    height:33%;
    border-bottom:1px solid #E0E0E0;
    border-right:1px solid #E0E0E0;
  }

  .post-score-answer{
    padding:10px;
    position:relative;
    height:33%;
    border-bottom:1px solid #E0E0E0;
    border-right:1px solid #E0E0E0;
  }

  .post-score-views{
    position:relative;
    height:33%;
    border-right:1px solid #E0E0E0;
  }

  .post-score-num {
    font-size:19px;
  }

  .post-content-content{
      word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height:150%;
  }

  .color-666 {
    color: #666;
  }
  .color-333 {
    color: #333;
  }
  .h-100 {
    height: 100%;
  }
    .cutfourline {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .cutoneline {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
</style>

<script>

import FirebaseService from '@/services/FirebaseService'
import { functions } from 'firebase';
import { write } from 'fs';

export default {
  name: 'Post',
   data(){
        return{
          user_email:''
        }
    },
    
	props: {
    id:{type:String},
    email:{type:String},
		date: {type: Date},
		title: {type: String},
    content: {type: String},
    imgSrc: {type: String},
  },

  created(){
      console.log("in post")
      this.item = this.$route.params.item
      this.user_email = this.$store.state.user.email
  },

  computed: {
		formatedDate() {
			return `${this.date.getFullYear()}년 ${this.date.getMonth()+1}월 ${this.date.getDate()}일`
    }
  },
  methods:{
    moveDetail(){
      this.$router.push(`/${this.item}/detail/${this.id}`);
    }
  },
}
</script>
