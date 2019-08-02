<template>
      <v-layout>
        <v-flex 12 mx-3 >
            <v-btn icon ><v-icon dark>fas fa-chevron-up</v-icon></v-btn>
            <h1>123</h1>
            <v-btn icon><v-icon dark>fas fa-chevron-down</v-icon></v-btn>
        </v-flex>
        
        <v-flex>
          <div class="caption ">{{formatedDate}}</div>
          <h2 class="color-333 headline font-weight-light">{{email}}</h2>
          <MarkdownViewer :content="content"></MarkdownViewer>
        </v-flex>
        
      </v-layout>
 
</template>

<script>

import FirebaseService from '@/services/FirebaseService'
import MarkdownViewer from './MarkdownViewer'
import { functions } from 'firebase';

export default {
  name: 'Answer',
	props: {
        id:{type:String},
		    date: {type: Date},
		    email: {type: String},
        content: {type: String},
  },
  components:{
    MarkdownViewer
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
