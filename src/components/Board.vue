<template>
  <div>
    <v-container v-for="(subject,index) in collection" :key="subject">
      <span class="subheading">{{index}} 게시글</span>
      <v-card flat v-for="item in subject" :key="item.title">
        <v-layout row wrap :class="`pa-3 ${index}`">
          <v-flex x12 sm6>
            <div class="caption grey--text">제목</div>
            {{ item.title }}
          </v-flex>
          <v-flex xs12 sm6>
            <div class="caption grey--text">생성일</div>
            {{ item.created_at }}
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import FirebaseService from '@/services/FirebaseService'

export default {
  data() {
    return {
      data_title :['AI','Bigdata','Blockchain','Webmobile'],
      collection : {
        AI : [],
        Bigdata : [],
        Blockchain : [],
        Webmobile : [],
      }
    }
  },
  created() {
    this.data_title.forEach(subject => {
      FirebaseService.getPosts(subject).then(res => {
        res.forEach(item => {
          if (this.collection[subject].length < 3){
          this.collection[subject].push({
            title : item.title,
            created_at : moment(item.created_at).format("YYYY-MM-DD"),
          })
          }
        })
      })
    })
  },
}
</script>

<style>
.AI{
  border-left: 4px solid #3cd1c2;
}
.Bigdata{
  border-left: 4px solid tomato;
}
.Blockchain{
  border-left: 4px solid blueviolet;
}
.Webmobile{
  border-left: 4px solid yellowgreen;
}
</style>
