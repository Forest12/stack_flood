<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <v-img :src="imgSrc" height="200px"></v-img>
      <div class="caption ">{{formatedDate}}</div>
      <h2 class="color-333 headline font-weight-light cutoneline">{{title}}</h2>
      <p class="mb-1 color-666 font-weight-light subheading cutfourline">{{content}}</p>
    </v-flex>
  </v-layout>
</template>

<script>

import FirebaseService from '@/services/FirebaseService'
import { functions } from 'firebase';

export default {
  name: 'Post',
    created:function(){
    this.item = this.$route.params.item;
  },
	props: {
		date: {type: Date},
		title: {type: String},
    content: {type: String},
    imgSrc: {type: String},
  },
 
  computed: {
		formatedDate() {
			return `${this.date.getFullYear()}년 ${this.date.getMonth()+1}월 ${this.date.getDate()}일`
    }
  }
}
</script>
<style>
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

