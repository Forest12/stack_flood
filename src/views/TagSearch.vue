<template>
  <v-container>
    <span class=".headline">{{ header }} 검색결과 확인</span>
    <p>검색 옵션</p>
    <v-btn-toggle v-model="text" flat>
      <v-btn text value="title">제목 검색</v-btn>
      <v-btn text value="content">내용 검색</v-btn>
      <v-btn text value="tag">태그 검색</v-btn>
      <v-btn text value="user">유저 검색</v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<script>
import FirebaseService from "../services/FirebaseService";
export default {
  data() {
    return {
      text:'title',
      
      header: "",
      subjects: ["AI", "Bigdata", "Blockchain", "Webmobile"]
    };
  },
  created() {
    console.log(this.$route,'ㅎㅁㄴㅇㅎ')
    this.header = this.$route.params.item
    this.subjects.forEach(async subject => {
      const res = await FirebaseService.getPosts(subject);
      res.forEach(post => {});
    });
  }
};
</script>

<style>
</style>
