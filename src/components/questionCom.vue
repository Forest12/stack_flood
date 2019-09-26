<template>
  <v-layout row wrap>
    <v-flex>
      <!-- votes, answer, views  -->
      <div class="q-content-body">
        <div class="q-score">
          <div class="q-score-votes">
            <span class="headline">{{ vote }}</span>
            <br />
            <span class="subtitle-1">votes</span>
          </div>

          <div  :class="{ answerChecked :answer>0, answerNotChecked: answer<=0}">
            <span class="headline">{{ answer }}</span>
            <br />
            <span class="subtitle-1">answers</span>
          </div>

          <div class="q-score-views">
            <span class="subtitle-2">{{ view }} views </span>
          </div>
        </div>
        <!-- title, content, tag -->
        <div class="q-content">
          <div class="q-content-title">
            <div class="q-content-header">
              <span class="q-content-reputation">+ {{ vote }}</span>
              <span class="q-content-title ml-2 title blue--text"  @click="moveDetail">{{ title }}</span>
            </div>
          </div>

          <div class="q-content-content py-2">{{ removetag }}</div>

          <!-- <div class="q-content-tag">
            <span
              class="q-content-tag-item blue lighten-4 mr-2 mb-1"
              v-for="tag in question.tags"
              :key="tag.index"
            >{{ tag }}</span>
          </div> -->
        </div>
          <!-- user_info -->
          <div class="q-user">
            <!-- <div class="q-user-date caption grey--text">{{ question.created_at}} 에 질문했습니다.</div>
            <v-icon>perm_identity</v-icon>
            {{ question.asked_user}} -->
            <user-info
            :email="this.email"
			  		:giturl="this.giturl"
				  	:userImg="this.userImg"
				  	:level="this.level"
					></user-info>
          </div>
      </div>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>


<style scoped>
.q-content-body{
  display:flex;
  padding:2px;
}

.q-container {
  padding: 30px;
}

/* votes, answers, views */
.q-score {
  float: left;
  width: 80px;
  height: 100%;
}

.q-score-votes {
  height: 35%;
  padding-top: 10px;
  padding-bottom: 3px;
  text-align: center;
}

.answerChecked {
  background: green;
  height: 40%;
  border: 1px solid green;
  text-align: center;
  padding: 5px;
  border-radius: 7px;
  color: white;
  margin-top: 10px;
}

.answerNotChecked {
  height: 40%;
  border: 1px solid green;
  text-align: center;
  padding: 5px;
  border-radius: 7px;
  color: black;
  margin-top: 10px;
}

.q-score-views {
  height: 20%;
  text-align: center;
  padding: 12px;
}

/* title, content, tags */
.q-content {
  padding: 15px;
  width: 90%;
  height: 100%;
}

.q-content-header {
  transition: all 0.2s;
  cursor: pointer;
}

.q-content-header:hover {
  transform: translateX(4px);
}

.q-content-content {
  margin:3px 0px;
  overflow: hidden;
  white-space: normal;
  line-height: 1.5;
  height: 3.6em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.q-content-reputation {
  padding: 5px;
  color: white;
  background: blue;
  border-radius: 5px;
  font-size: 13px;
  position: relative;
  bottom: 3px;
}

.q-content-tag {
  float: left;
  padding: 0px;
  margin-top:3px;
  width: 60%;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;


}

.q-content-tag-item {
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  color: #0d47a1;
}

.q-user {
  padding:5px;
  float: left;
  width: 200px;
}
</style>

<script>
import userInfo from './userInfo'

import FirebaseService from "@/services/FirebaseService";
import { functions, firestore } from "firebase";
import { write } from "fs";

export default {
  components:{
    userInfo,
  },
  data() {
    return {
      user_email: "",
      tempitem:"",
      answer:"",
      vote:"",
  }
  },



  props: {
    id: { type: String },
    email: { type: String },
    title: { type: String },
    content: { type: String },
    getitem: { type: String },
    view: { type: Number },
    tags: {},
    giturl: { type: String },
    userImg: { type: String },
    level: { type: Number },
  },

  created(){
      this.tempitem=this.getitem
      this.item = this.$route.params.item
      if(this.item==null&&this.tempitem!=null){
        this.item=this.tempitem
      }
      this.getAnswerCount(this.id,this.item)
      this.getvoteCount(this.id)
  },


  computed: {
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
          options:tag
        }
      })
    }
  }
};
</script>