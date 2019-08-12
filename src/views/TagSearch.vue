<template>
  <v-container>
    <span class=".headline">{{ header }} 검색결과 확인</span>
    <p>검색 옵션</p>
    <v-btn-toggle v-model="text" flat>
      <v-btn text value="title" @click="setTitle">제목 검색</v-btn>
      <v-btn text value="content" @click="setContent">내용 검색</v-btn>
      <v-btn text value="tag" @click="setTag">태그 검색</v-btn>
    </v-btn-toggle>
    {{ msg }}

    <v-layout row wrap class="ml-3">
    <v-flex v-for="i in posts.length" v-bind:key='i.title' class="xs12" px-3>
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
					:level="posts[i-1].level"
					:userImg="posts[i-1].userImg"
					
					></user-info>
				</div>
			</div>
      <!-- <v-divider></v-divider> -->


    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import FirebaseService from "../services/FirebaseService";
import { firestore } from 'firebase';
import Post from '../components/Post'
import userInfo from '../components/userInfo'

export default {
  components:{
    Post,
    userInfo,
  },
  data() {
    return {
      text:'',
      msg:'',
      option:'',
      header: "",
      subjects: ["AI", "Bigdata", "Blockchain", "Webmobile"],
      posts:[],
    };
  },
  created() {
    // console.log(this.$route,'ㅎㅁㄴㅇㅎ')
    this.header = this.$route.params.item
    this.option = this.$route.query.options
    
    if (this.option === 'tag'){
      this.text = 'tag'
      this.msg = '해당 태그가 등록된 게시글을 검색합니다'
      this.setTag()
    } else if (this.option === 'title') {
      this.text = 'title'
    }

    // this.subjects.forEach(async subject => {
    //   const res = await FirebaseService.getPosts(subject);
    //   res.forEach(post => {
    //   });
    // });
  },
  methods: {
    async setTag(){
      this.posts = []
      this.msg = '해당 태그가 등록된 게시글을 보여드립니다.'
      const res = await FirebaseService.getTag(this.header)
      const res2 = res.split('#')
      // this.subjects.forEach(async subject => {
      //   res2.forEach(async token => {

      //   })
      // })
      this.subjects.forEach(subject => {
        res2.forEach(async token => {
          let data = await FirebaseService.getPost(token,subject)
          
          if (data){
            this.posts.push(data)
          }
        })
      })
      console.log(this.posts,"ggasdgasdg")
    },
    setContent() {
      this.msg = '해당 내용이 포함된 게시글을 보여드립니다.'

    },
    setTitle() {
      this.msg = '해당 제목이 포함된 게시글을 보여드립니다.'
    }
  }
};
</script>

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
