<template>
  <v-container class="pa-5">
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="data in dataset" :key="data.title">
        <v-card max-width="300" class="mx-auto" >
          <v-icon>{{ data.icon }}</v-icon>
          <v-card-title>{{ data.title }}</v-card-title>
          <v-card-text>{{ data.content}}</v-card-text>
        </v-card>
      </v-flex>
      

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return{
      dataset: [
        {icon:'mood', title:'도메인별 질문', content:'AI, 빅데이터, 블록체인, 웹/모바일 질문 답변하기 '},
        {icon:'person_add', title:'팔로우', content:'팔로워의 질문,답변 확인 가능'},
        {icon:'mood', title:'검색', content:'질문 검색 가능'},
      ]
    }
  }

};
</script>

<style>
</style>
