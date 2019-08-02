<template>
<v-container>
    <v-layout my-5>
        <v-flex>
            <h1>{{post.title}}</h1>
            <div class="font-weight-light subheading cutfourline">ASKED {{formatedDate}}</div>
            <hr>
        </v-flex>
    </v-layout>

    <v-layout xs1 my-5>
        <v-flex px-12 mx-3 >
            <v-btn icon ><v-icon dark>fas fa-chevron-up</v-icon></v-btn>
            <h1>123</h1>
            <v-btn icon><v-icon dark>fas fa-chevron-down</v-icon></v-btn>
        </v-flex>

        <v-flex xs11>
            <v-img :src="post.img" height="200px" width="200px"></v-img>
            <MarkdownViewer :content="post.content"></MarkdownViewer>
        </v-flex >  
    </v-layout>
      
      <v-flex mx-5 v-if="post.email == $store.state.user.email">
        <v-btn outlined color="green" dark ><v-icon left small>fas fa-edit</v-icon>Edit</v-btn>
        <v-btn outlined color="pink" dark ><v-icon left small>fas fa-trash-alt</v-icon>Delete</v-btn>
      </v-flex>



    <div>
        <h1>Answers</h1>
        <hr>
    </div>
    

    <v-layout py-4 h-100>
        
        <v-flex>
            <AnswerList :item = this.item :post_token= this.post_token></AnswerList>
        </v-flex>
    </v-layout>

    <div>
        <h1>Your Answer</h1>
    </div>
    
    

    <div>
        <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
        <div class="my-2">
        <v-btn @click="postAnswer" color="primary" >Post Your Answer</v-btn>
        </div>

    </div>
    <div>
        <h1>TEST</h1>
        <Editor ref="editor" :outline="true" mode="Rendered" v-model="text" />
        
    </div>
  </v-container>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import AnswerList from '../components/AnswerList'
import MarkdownViewer from '../components/MarkdownViewer'
import { constants } from 'crypto';
import { Editor, Renderer } from 'vuetify-markdown-editor';
import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css'

export default {
    name: 'PostDetailPage',
    components:{
        AnswerList,
        MarkdownViewer,
        Editor,
        
    },
    data(){
        return{
            post_token: '',
            item: '',
            post:'',
            content:'',
            text:'# hello \n ```html \n <div>hello</div> \n```',
        }
    },
	created(){
        this.item = this.$route.params.item
        this.post_token = this.$route.params.post_token

    },
    mounted(){
        this.getPost(this.post_token,  this.item)
 
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

<style scoped>
Editor {
    display:none;
}
</style>