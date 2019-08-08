<template>
  <v-container>
    <h2 class="headline my-5 text-xs-center">New Post</h2>

    <v-form>
      <v-text-field v-model="title" :counter="30" label="Title" required></v-text-field>

      <ImageUploader></ImageUploader>

      <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
      <v-btn @click="postPost" color="pink darken-2" dark>
        <v-icon dark left>fas fa-edit</v-icon>Post
      </v-btn>
      
      <div class="markdown-body">
        <div v-html="mdtohtml"></div>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import ImageUploader from "../components/ImageUploader";

import hljs from "highlight.js";
import "github-markdown-css";
import MarkdownIt from "markdown-it";
import 'highlight.js/styles/vs2015.css'

export default {
  name: "NewPost",
  components: {
    ImageUploader
  },
  data() {
    return {
      title: "",
      content: "",
      item: "",
      img: "",
      imageFile: "",
      editor:"",
    };
  },
  computed:{
    mdtohtml() {
          const MarkdownIt = require("markdown-it");
          const md = new MarkdownIt({
            highlight: function(str, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return (
                    '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    "</code></pre>"
                  );
                } catch (__) {}
              }
              return (
                '<pre class="hljs"><code>' +
                md.utils.escapeHtml(str) +
                "</code></pre>"
              );
            }
          });
          const result = md.render(this.content);
          this.editor = result;
          return result
        } 
  },

  created() {
    this.item = this.$route.params.item;
    FirebaseService.logging("new " + this.item + " post");
  },

  methods: {
    postPost() {
      FirebaseService.postPost(this.item, this.title, this.content);
      this.$router.push(`/post/${this.item}/new`);
    },
    
  }
};
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

code{
  -webkit-box-shadow:none;
  box-shadow:none;
}

</style>