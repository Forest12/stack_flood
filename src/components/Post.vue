<template>
  <v-layout py-4 h-100>
    <v-flex >
      <div row @click="moveDetail">
        <div class="caption ">{{formatedDate}}</div>
        <h2 class="color-333 headline font-weight-light cutoneline">{{title}}</h2>
        <p class="mb-1 color-666 font-weight-light subheading cutfourline">{{content}}</p>
      </div>
    
    </v-flex>
    
  </v-layout>
</template>

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
