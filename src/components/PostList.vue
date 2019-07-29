<template>
  <v-layout row wrap mw-700>
    <v-flex v-for="i in posts.length > limits ? limits 
		:posts.length" v-bind:key='i.id' 
		:class="'xs' + 12 / column" 
		px-3>
      <Post
	  	:id="posts[i - 1].id"
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
	name: 'PostList',
	
	 
	props: {
		// id:{type:String},
        // item:{type:String},
		column: {type: Number, default: 1},
		limits: {type: Number, default: 4},
		loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
			posts: [],
			item: ''
		}
	},
	components: {
		Post
	},
	created(){
    	this.item = this.$route.params.item;
		FirebaseService.logging(this.item);

		console.log('uid check');
		if (firebase.auth().currentUser !== null) {
			console.log("user id: " + firebase.auth().currentUser.uid);
	 	}
  	},
	mounted() {
		this.getPosts(this.item)
	},
	methods: {
		async getPosts(item) {
			this.posts = await FirebaseService.getPosts(item)
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
