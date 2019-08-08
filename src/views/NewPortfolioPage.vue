<template>
<v-container>
  <h2 class="headline my-5 text-xs-center">New Portfolio</h2>

  <v-form>
  <v-text-field
      v-model="title"
      :counter="30"
      label="Title"
      required
    ></v-text-field>
   
    <ImageUploader></ImageUploader>


    <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
    <v-btn @click="postPortfolio" color="pink darken-2" dark><v-icon dark left>fas fa-edit</v-icon>Post</v-btn>
 
  </v-form>
</v-container>
</template>

<script>

import FirebaseService from '@/services/FirebaseService'
import ImageUploader from '../components/ImageUploader'

export default {
	name: 'NewPost',
	components:{
        ImageUploader
    },
	data() {
		return {
            title: "",
            content: "",
            img: "",
         
		}
    },

    created(){
        FirebaseService.logging("new portfolio");    
    },

    methods: {
       postPortfolio() {
            return FirebaseService.postPortfolio(this.title, this.content, this.img)
            
        },
    },

}
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
</style>