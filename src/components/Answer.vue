<template>

      <div>
      <div class="caption ">{{formatedDate}}</div>
      <h2 class="color-333 headline font-weight-light">{{email}}</h2>
      <div class="mb-1 color-666 font-weight-light subheading" v-html="compiledMarkdown"></div>
        </div>
 
</template>

<script>

import FirebaseService from '@/services/FirebaseService'
import { functions } from 'firebase';

export default {
  name: 'Answer',
	props: {
        id:{type:String},
		date: {type: Date},
		email: {type: String},
        content: {type: String},
  },
  computed: {
	formatedDate() {
		return `${this.date.getFullYear()}년 ${this.date.getMonth()+1}월 ${this.date.getDate()}일`
    },
    compiledMarkdown: function () {
        console.log( marked(this.content))
      return marked(this.content)
    }
  },
  methods:{
    
  }
}
</script>
