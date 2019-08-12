<template>
  <v-layout py-4 h-100>
    <v-flex>
      <div row class="post-body-box">
        <!-- <div class="caption ">{{formatedDate}}</div>
        <h2 class="color-333 headline font-weight-light cutoneline">{{title}}</h2>
        <p class="mb-1 color-666 font-weight-light subheading cutfourline">{{content}}</p>
        </div>-->
        <!-- <div class="post-body-box"> -->
        <div class="post-score-box">
          <div class="post-score-votes">
            <div class="center">
              <span class="post-score-num">{{ vote }}</span>
              <span> votes</span>
            </div>
          </div>

          <!-- answer box -->
          <div class="post-score-answer">
            <div class="center">
              <span class="post-score-num">{{answer}}</span>
              <span> answers</span>
              <!-- 답변 완료시 체크모양 표시 -->
              <ssafy class="ssafy"></ssafy>
            </div>
          </div>

          <div class="post-score-views">
            <div class="center">
              <span class="post-score-num">{{view}}</span>
              <span> views</span>
            </div>
          </div>
        </div>
        <div class="post-content-box pa-3">
          <div class="post-content-title title blue--text mb-2" @click="moveDetail">{{ title }}</div>

          <div class="post-content-content">{{ removetag }}</div>
          <div class="post-content-tags">
            <span
              class="post-content-tag lighten-4 mr-2 mb-1"
              v-for="(tag, index) in tags"
              :key="index"
              @click="goSearch(tag)"
            >{{ tag }}</span>
          </div>
        </div>

        <!-- </div> -->
      </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.ssafy {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.center {
  width: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
}

.post-body-box {
  display: flex;
  min-height: 200px;
  max-height: 400px;
  width: 100%;
  transition: all 0.3s;
}

.post-score-box {
  flex: left;
  width: 100px;
}

.post-content-title {
  cursor: pointer;
  transition: all 0.3s;
}

.post-content-title:hover {
  transform: translateX(7px);
}
.post-content-box {
  flex: left;
  width: 80%;
}

.post-score-votes {
  position: relative;
  height: 30%;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}

.post-score-answer {
  padding: 10px;
  position: relative;
  height: 40%;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  /* background: url('../assets/images/check-mark.svg') */
}

.post-score-views {
  position: relative;
  height: 30%;
  border-right: 1px solid #e0e0e0;
}

.post-score-num {
  font-size: 19px;
}

.post-content-content {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 150%;
}

.post-content-tags{
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height:85px;
}


.post-content-tag {
  cursor:pointer;
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  color: #0d47a1;
  position: relative;
  top: 20px;
  background: #90CAF9;
}
.post-content-tag:hover {
  background: #E3F2FD;
  color:#90CAF9;
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
import FirebaseService from "@/services/FirebaseService";
import { functions, firestore } from "firebase";
import { write } from "fs";

import ssafy from "./ssafy";

export default {
  components: {
    ssafy
  },
  name: "Post",
  data() {
    return {
      user_email: "",
      tempitem:"",
      answer:"",
      vote:"",
    };
  },

  props: {
    id: { type: String },
    email: { type: String },
    date: { type: Date },
    title: { type: String },
    content: { type: String },
    imgSrc: { type: String },
    getitem: { type: String },
    view: { type: Number },
    tags: {},
  },

  created(){
      this.tempitem=this.getitem
      this.item = this.$route.params.item
      if(this.item==null&&this.tempitem!=null){
        this.item=this.tempitem
      }
      this.user_email = this.$store.state.user.email
      this.getAnswerCount(this.id,this.item)
      this.getvoteCount(this.id)
  },


  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth() +
        1}월 ${this.date.getDate()}일`;
    },
    removetag() {
      let ta = this.content.replace(/<br\/>/ig, "\n"); 
      ta = ta.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
      return ta
    }
  },
  methods: {
    moveDetail() {
      this.$router.push(`/${this.item}/detail/${this.id}`);
    },
    getAnswerCount(id,item){
      FirebaseService.getAnswers(item, id)
      .then(res => {
        this.answer=res.length
      })
    },
    getvoteCount(id){
      FirebaseService.getVote(id)
      .then(res => {
        this.vote=res
      })
    },
    goSearch(tag){
      this.$router.push({
        path:`/search/${tag}`,
        query:{
          options:'tag'
        }
      })
    }
  }
};
</script>
