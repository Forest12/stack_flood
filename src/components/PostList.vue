<template>
  <v-layout row wrap class="ml-3">
    <v-flex v-for="i in posts.length > limits ? limits : posts.length" v-bind:key='i.title' :class="'xs' + 12 / column" px-3>
			<div class="post-con">

			<!-- 포스트 내용 -->
			<div class="post-con-left">
					<div class="post-time py-2">
				<v-layout justify-space-between>
						<span class="grey--text">2019.03.16 am 10:39 Fri</span>
						<span class="grey--text">내공 : 100</span>
				</v-layout>
					</div>
				<Post
						:email="posts[i-1].email"
						:id="posts[i - 1].id"
								:date="posts[i - 1].created_at"
								:title="posts[i - 1].title"
								:content="posts[i - 1].content"
					:imgSrc="posts[i - 1].img"></Post>
				</div>
			

			<!-- 유저 정보 표시 -->
				<div class="post-con-right">
					<user-info></user-info>
				</div>
			</div>
      <!-- <v-divider></v-divider> -->


    </v-flex>
  </v-layout>
</template>
<style scoped>
	.post-time{
		border-top:2px dotted #e0e0e0;
		border-bottom:2px dotted #e0e0e0;
		position:relative;
		top:8%;
	}
	
	.post-con{
		display:flex;
	}
	.post-con-left{
		float:left;
		width:100%;
	}

	@media screen and (max-width: 1000px){
		.post-con-right{
			transform:scale(0.7,0.7)
		}
	}
	
</style>
<script>

import FirebaseService from '@/services/FirebaseService'
import firebase from 'firebase/app'
import Post from './Post'
import userInfo from './userInfo'

export default {
	 created:function(){
    this.item = this.$route.params.item;
	FirebaseService.logging(this.item);

	console.log('uid check');
	if (firebase.auth().currentUser !== null) {
		console.log("user id: " + firebase.auth().currentUser.uid);
	 }
  },
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
		Post,
		userInfo
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
