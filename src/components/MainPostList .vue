<template>
  <v-layout row wrap>
    <v-flex v-for="i in posts.length > limits ? limits : posts.length" v-bind:key='i.title' :class="'xs' + 12 / 1" px-3>
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
	props: {
        item:{type:String},
		limits: {type: Number, default: 3},
		loadMore: {type: Boolean, default: false}
	},
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
