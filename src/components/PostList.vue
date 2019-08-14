<template>
  <v-layout row wrap class="ml-3">
    <v-flex v-for="i in posts.length" v-bind:key='i.title' xs12 px-3>
			<div class="post-con">

			<!-- 포스트 내용 -->
			<div class="post-con-left">
					<div class="post-time py-2">
				<v-layout justify-space-between>
						<span class="grey--text">{{posts[i-1].postdate}}</span>
						<span class="grey--text"> 추천 수 : {{posts[i-1].vote}}</span>
				</v-layout>
					</div>
				<Post
					:email="posts[i-1].email"
					:id="posts[i - 1].id"
					:date="posts[i - 1].created_at"
					:title="posts[i - 1].title"
					:content="posts[i - 1].content"
					:imgSrc="posts[i - 1].img"
					:view="posts[i - 1].view"
					:tags="posts[i - 1].tags"
					></Post>
				</div>
			

			<!-- 유저 정보 표시 -->
				<div class="post-con-right">
					<user-info
					:email="posts[i-1].email"
					:giturl="posts[i-1].giturl"
					:userImg="posts[i-1].userImg"
					
					></user-info>
				</div>
			</div>
      <!-- <v-divider></v-divider> -->


    </v-flex>

	<!--<div v-for="i in (posts.length/10 + 1)" v-bind:key='i.title' :class="'xs' + 12 / column" px-3 style="display:inline-block;">
		<div class="my-2" style="display:inline-block; margin-left:10px;">
			<v-btn text small color="primary"
				v-on:click="viewpost('Blockchain')">{{i}}</v-btn>
		</div>
	</div>-->
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
	created(){
  this.item = this.$route.params.item;
	FirebaseService.logging(this.item);
  },
	props: {
    
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
			console.log(this.posts,'나오냐나오냐아노')
		},
	}
}

</script>
