<template>
  <v-layout row wrap mw-700>
    <v-flex v-for="i in posts.length > limits ? limits : posts.length" v-bind:key='i.title' :class="'xs' + 12 / column" px-3>
      <Post
            	:date="posts[i - 1].created_at"
            	:title="posts[i - 1].title"
            	:content="posts[i - 1].content"
				:imgSrc="posts[i - 1].img"></Post>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>
<script>

import FirebaseService from '@/services/FirebaseService'
import firebase from 'firebase/app'
import Post from './Post'

export default {
	name: 'MyPostList',
	props: {
        item:{type:String},
		column: {type: Number, default: 1},
		limits: {type: Number, default: 4},
		loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
			posts: []
		}
	},
	components: {
		Post
	},
	mounted() {
		console.log()
		console.log('mounted')
		this.getMyPosts("Webmobile")
	},
	methods: {
		async getMyPosts(item) {
			console.log(this.props)
			console.log("start work")
			this.posts = await FirebaseService.getMyPosts(item)
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
