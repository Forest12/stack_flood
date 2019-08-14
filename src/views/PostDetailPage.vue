<template>
<v-container>
    <v-layout mt-5>
        <v-flex>
            <h1>{{post.title}}</h1>
            <div class="font-weight-light  subheading cutfourline">WRITER {{post.email}}</div>
            <div class="font-weight-light grey--text cutfourline">ASKED {{post.postdate}}</div>
            <hr>
        </v-flex>
    </v-layout>
    <div class="post-content-tags mt-3">
      <span
        class="post-content-tag lighten-4 mr-2 mb-1"
        v-for="(tag, index) in post.tags"
        :key="index"
        @click="goSearch(tag)"
      ><v-chip class="white--text" color="#E67933">{{ tag }}</v-chip></span>
      
    </div>

    <v-layout xs1 my-5>
        <v-flex px-12 mx-3 >
          <v-layout justify-center>
            <v-btn icon @click="vote(true)"><v-icon dark>fas fa-chevron-up</v-icon></v-btn>
          </v-layout>

          <v-layout justify-center>
            <h1>{{num_vote}}</h1>
          </v-layout>
            
          <v-layout justify-center>
            <v-btn icon @click="vote(false)"><v-icon dark>fas fa-chevron-down</v-icon></v-btn>
          </v-layout>
        </v-flex>

        <v-flex xs11>
            <!-- <MarkdownViewer :content="post.content"></MarkdownViewer> -->
            <div class="markdown-body">
              <div v-html="editor"></div>
            </div>

             <v-layout mx-5 v-if="post.email == $store.state.email">

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn outlined color="green" dark v-on="on" @click="initedit"><v-icon left small>fas fa-edit</v-icon>Edit</v-btn>
            <v-btn outlined color="pink" @click="removePost" dark ><v-icon left small>fas fa-trash-alt</v-icon>Delete</v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">Edit Post</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Title" v-model="editTitle"></v-text-field>
                  <h1>{{editTitle}}</h1>
                </v-flex>
                <v-flex xs12>
                    <markdown-editor label="Content" v-model="editContent" ref="markdownEditor"></markdown-editor>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editPost">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

        </v-flex >  
    </v-layout>
      

   


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
        <markdown-editor v-model="answerContent" ref="markdownEditor"></markdown-editor>
        <div class="my-2">
        <v-btn @click="postAnswer" color="primary" >Post Your Answer</v-btn>
        </div>
    </div>
    <div>
    </div>
  </v-container>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import AnswerList from '../components/AnswerList'
import MarkdownViewer from '../components/MarkdownViewer'
import { constants } from 'crypto';
import { Editor, Renderer } from 'vuetify-markdown-editor';
// import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css'

import { md2 } from '../plugins/markdownit'

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
            num_vote:0,
            tags:[],
            answerContent:'',
            view:"",
            text:'# hello \n ```html \n <div>hello</div> \n```',
            dialog: false,

            editTitle: "",
            editContent: "",
            editor:"",

        }
    },
	created(){
        FirebaseService.logging(this.post_token);
        this.item = this.$route.params.item
        this.post_token = this.$route.params.post_token
        this.getPost(this.post_token,  this.item)
        this.getVote()
        this.getTeg()
    },
    computed:{
      //   formatedDate(){
			// return `${this.post.created_at.getFullYear()}년 ${this.post.created_at.getMonth()+1}월 ${this.post.created_at.getDate()}일`
      //   },
        
    },
    methods:{
        initedit(){
            this.editTitle = this.post.title
            this.editContent = this.post.content
        },
        async getPost(post_token,item) {
            this.post = await FirebaseService.getPost(post_token, item)
            this.addview()
            this.editor = this.post.content
            //console.log(this.editor,'에디터에디터')
        },
        async postAnswer(){
          if(this.$store.state.user){
            const edit = await md2.render(this.answerContent)
            FirebaseService.postAnswer(this.item, this.post_token, edit)
            location.href = `/${this.item}/detail/${this.post_token}`
          }else{
            alert("댓글을 남기시려면 먼저 로그인 해 주세요 ε=ε=(っ* ´□` )っ")
          }
        },
        editPost(){
            FirebaseService.editPost(this.item,this.post_token, this.editTitle,this.editContent)
            this.post.title = this.editTitle
            this.post.content = this.editContent
            this.dialog = false
        },
        addview(){
            //console.log(this.post,"postcheck!!!~~~~~~~~~~~~~")
            FirebaseService.addview(this.item,this.post_token,this.post.view)
        },
        removePost(){
            FirebaseService.removePost(this.item,this.post_token)
            alert("POST가 삭제되었습니다.")
            this.$router.push(`/post/${this.item}`)
            
        },
        vote(check){
            if(this.$store.state.user){
            FirebaseService.vote(this.post_token, this.$store.state.email,check).then(res=>{
              console.log(res, check)
              if(res){
                if(check){
                  this.num_vote += 1
                }
                else{
                  this.num_vote -=1
                }
              }
            })
            }else{
            alert("먼저 로그인 해 주세요 ε=ε=(っ* ´□` )っ")
            }
        },
        getVote(){
          FirebaseService.getVote(this.post_token).then(res => {
            this.num_vote = res
          })
        },
        getTeg(){

        },
        goSearch(tag){
          this.$router.push({
            path:`/search/${tag}`,
            query:{
              options:'tag'
            }
          })
        }
    }
}
</script>

<style scoped>

Editor {
    display:none;
}
.mychip{
  cursor:pointer;
}

</style>