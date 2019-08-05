<template>
<v-container>
    <v-layout my-5>
        <v-flex>
            <h1>{{post.title}}</h1>
            <div class="font-weight-light  subheading cutfourline">ASKED {{formatedDate}}</div>
            <hr>
        </v-flex>
    </v-layout>

    <v-layout xs1 my-5>
        <v-flex px-12 mx-3 >
          <v-layout justify-center>
            <v-btn icon @click="upVote"><v-icon dark>fas fa-chevron-up</v-icon></v-btn>
          </v-layout>

          <v-layout justify-center>
            <h1>{{post.voted}}</h1>
          </v-layout>
            
          <v-layout justify-center>
            <v-btn icon><v-icon dark>fas fa-chevron-down</v-icon></v-btn>
          </v-layout>
        </v-flex>

        <v-flex xs11>
            <v-img :src="post.img" height="200px" width="200px"></v-img>
            <MarkdownViewer :content="post.content"></MarkdownViewer>
        </v-flex >  
    </v-layout>
      

    <v-layout mx-5 v-if="post.email == $store.state.user.email">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn outlined color="green" dark v-on="on" ><v-icon left small>fas fa-edit</v-icon>Edit</v-btn>
            <v-btn outlined color="pink" @click="removePost" dark ><v-icon left small>fas fa-trash-alt</v-icon>Delete</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Post</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <!-- <v-flex xs12>
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                  ></v-text-field>
                </v-flex> -->
                <v-flex xs12>
                  <v-text-field label="Title" v-model="editTitle"></v-text-field>
                  <h1>{{editTitle}}</h1>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Image URL" v-model="editImgURL"></v-text-field>
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
            answerContent:'',
            text:'# hello \n ```html \n <div>hello</div> \n```',
            dialog: false,

            editTitle: "",
            editImgURL: "",
            editContent: "",
        }
    },
	created(){
        this.item = this.$route.params.item
        this.post_token = this.$route.params.post_token
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
            this.editTitle = this.post.title
            this.editImgURL = this.post.img
            this.editContent = this.post.content
        },
        
        postAnswer(){
            FirebaseService.postAnswer(this.item, this.post_token, this.answerContent)
            console.log("com")
        },
        editPost(){
            FirebaseService.editPost(this.item,this.post_token, this.editTitle, this.editImgURL ,this.editContent)
            this.post.title = this.editTitle
            this.post.img = this.editImgURL
            this.post.content = this.editContent
            this.dialog = false
        },
        removePost(){
            FirebaseService.removePost(this.item,this.post_token)
            alert("POST가 삭제되었습니다.")
            this.$router.push(`/post/${this.item}`)
            
        },

        upVote(){
            FirebaseService.vote(this.post_token, this.$store.state.user.email)
            this.post.vote =+ 1
        }

    }
}
</script>

<style scoped>
Editor {
    display:none;
}
</style>