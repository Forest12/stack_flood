<template>
<v-container>
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
            <div class="font-weight-light  subheading cutfourline">ASKED {{formatedDate}}</div>

            <MarkdownViewer :content="content"></MarkdownViewer>
            <v-layout v-if="email == $store.state.user.email">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn outlined color="green" dark v-on="on" @click="initedit"><v-icon left small>fas fa-edit</v-icon>Edit</v-btn>
                    <v-btn outlined color="pink"  dark @click="removeAnswer"><v-icon left small>fas fa-trash-alt</v-icon>Delete</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Edit Post</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                            <markdown-editor label="Content" v-model="editContent" ref="markdownEditor"></markdown-editor>
                        </v-flex>
                        <v-flex class="blue">
                          <VueTags v-model="tags">
                          <div class="tags-input"
                             slot-scope="{tag,removeTag,inputEventHandlers,inputBindings }">

                            <span v-for="tag in tags" class="tags-input-tag" >
                              <span>{{ tag }}</span>

                              <button type="button" class="tags-input-remove"
                                  v-on:click="removeTag(tag)">&times;
                              </button>

                            </span>
                            <input
                              class="tags-input-text"  placeholder="Add tag..."
                              v-on="inputEventHandlers"
                              v-bind="inputBindings"
                            >
                            </div>
                          </VueTags>
                        </v-flex>
                      </v-layout>
                     
                      
                   


                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="editAnswer" >Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
        </v-flex > 
         
    </v-layout>
 </v-container>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import MarkdownViewer from './MarkdownViewer'
import { functions } from 'firebase';
import VueTags from "vue-tags"

export default {
  name: 'Answer',
  data(){
    return{
      dialog: false,
      editContent:"",
      num_vote:0,
      tags: ['Javascript','Vuejs'],
    }
  },
	props: {
        post_token:{type: String},
        answer_token:{type:String},
		    date: {type: Date},
		    email: {type: String},
        content: {type: String},
        item: {type:String},
  },
  components:{
    MarkdownViewer,
    VueTags
  },
 
  computed: {
	  formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth()+1}월 ${this.date.getDate()}일`
    },
   
  },
  created(){
    
  },
  methods:{
    initedit(){
            this.editContent = this.content
        },
    editAnswer(){
        FirebaseService.editAnswer(this.item,this.post_token,this.answer_token,this.editContent)
        this.content = this.editContent
        this.dialog = false
    },
    removeAnswer(){
        FirebaseService.removeAnswer(this.item,this.post_token,this.answer_token)
        alert("Answer이 삭제되었습니다.")
        this.$router.push(`/${this.item}/detail/${this.post_token}`)    
    },

    vote(check){
          FirebaseService.vote(this.answer_token, this.$store.state.user.email,check).then(res=>{
          if(res){
            if(check){
              this.num_vote += 1
            }
            else{
              this.num_vote -=1
            }
          }
        })
      },

    getVote(){
      FirebaseService.getVote(this.answer_token).then(res => {
        this.num_vote = res
      })
    }  
  }
}
</script>