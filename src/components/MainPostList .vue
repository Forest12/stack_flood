<template>
  <v-layout row wrap>
    <v-flex v-for="i in posts.length" v-bind:key='i.title' xs>
      <questionCom
	  			:email="posts[i-1].email"
	  			:id="posts[i - 1].id"
            	:title="posts[i - 1].title"
            	:content="posts[i - 1].content"
				:getitem="posts[i - 1].item"
				:view="posts[i - 1].view"
				:tags="posts[i - 1].tags"
				:giturl="posts[i - 1].giturl"
				:userImg="posts[i - 1].userImg"
				:level="posts[i - 1].level"
				>
				
				</questionCom>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>
<script>


import FirebaseService from '@/services/FirebaseService'
import firebase from 'firebase/app'
import questionCom from './questionCom'

export default {
	name: 'MainPostList',
	
	data() {
		return {
			posts: []
		}
	},
	components: {
		questionCom
	},
	mounted() {
		this.getMainPosts(this.item)
		console.log(limits,"!@##!@#!@#@#!!@#!@#")
	},
	methods: {
		async getMainPosts(item) {
			this.posts = await FirebaseService.getMainPosts(item)
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
