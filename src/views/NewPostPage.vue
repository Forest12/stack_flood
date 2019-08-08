<template>
<v-container>
  <h2 class="headline my-5 text-xs-center">New Post</h2>

  <v-form>
  <v-text-field
      v-model="title"
      :counter="30"
      label="Title"
      required
    ></v-text-field>
   
    <ImageUploader></ImageUploader>


    <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
    <v-btn @click="postPost" color="pink darken-2" dark><v-icon dark left>fas fa-edit</v-icon>Post</v-btn>
 
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
            item: "",
            img: "",
            imageFile: "",
         
		}
    },

    created(){
        this.item = this.$route.params.item;
        FirebaseService.logging("new "+this.item+" post");    
    },

    methods: {
        postPost() {
            FirebaseService.postPost(this.item, this.title, this.content)
            this.$router.push(`/post/${this.item}/new`);
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