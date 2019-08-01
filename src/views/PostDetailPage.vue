<template>
<v-container>
  <v-layout py-4 h-100>

    <v-flex>
        <h1>{{post.title}}</h1>
        <hr>
        <div class="font-weight-light subheading cutfourline">ASKED {{formatedDate}}</div>
        <v-img :src="post.img" height="200px"></v-img>
        <div class="caption ">{{post.created_at.getFullYear()}} ------------------------</div>
        <p class="mb-1 color-666 font-weight-light subheading cutfourline">{{post.content}}</p>
    </v-flex>       
    </v-layout>

    <div>
        <AnswerList :item = this.item :post_token= this.post_token></AnswerList>

    </div>
    

    <div>
        <h2 class="color-333 headline font-weight-light cutoneline">Your Answer</h2>
        <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
        <div class="my-2">
        <v-btn @click="postAnswer" color="primary" >Post Your Answer</v-btn>
        </div>

    </div>
  </v-container>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import AnswerList from '../components/AnswerList'
import { constants } from 'crypto';

export default {
    name: 'PostDetailPage',
    components:{
        AnswerList,
    },
    data(){
        return{
            post_token: '',
            item: '',
            post:'',
            content:'',
        }
    },
	created(){
        this.item = this.$route.params.item
        this.post_token = this.$route.params.post_token
    },
    mounted(){
        this.getPost(this.post_token, this.item)
    },
    computed:{
        formatedDate(){
			return `${this.post.created_at.getFullYear()}년 ${this.post.created_at.getMonth()+1}월 ${this.post.created_at.getDate()}일`
        }
    },
    methods:{
        async getPost(post_token,item) {
            this.post = await FirebaseService.getPost(post_token, item)
        },
        postAnswer(){
            FirebaseService.postAnswer(this.item, this.post_token, this.content)
            console.log("com")
        }
    }
}
</script>