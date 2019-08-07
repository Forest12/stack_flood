<template>
  <v-layout wrap>
    <v-flex xs12 v-for="i in answers.length" v-bind:key='i.email'>
      <Answer
            :post_token="post_token"
            :answer_token ="answers[i - 1].id"
	  		    :email="answers[i - 1].email"
            :date="answers[i - 1].created_at"
            :content="answers[i - 1].content"
            :item="item"></Answer>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>
<script>

import FirebaseService from '@/services/FirebaseService'
import firebase from 'firebase/app'
import Answer from './Answer'

export default {
    name: 'AnswerList',
    props: {
        item:{type:String},
        post_token:{type:String},

	},
    
	data() {
		return {
			answers: []
		}
	},
	components: {
		Answer
	},
	mounted() {
		this.getAnswers(this.item ,this.post_token)
	},
	methods: {
		async getAnswers(item, post_token) {
            this.answers = await FirebaseService.getAnswers(item, post_token)
		},
	}
}

</script>
<style>
  .mw-700 {
    max-width: 700px;
    margin: auto;
  }
</style>
