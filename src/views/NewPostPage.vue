<template>
  <v-container>
    <h2 class="headline my-5 text-xs-center">New Post</h2>

    <v-form>
     
      
      <h2 class="mt-5"><v-icon class="mx-3" color="#FFA500">fas fa-check-circle</v-icon>귀하의 질문 제목이 무엇입니까?</h2>
      <template>
      <blockquote class="blockquote">제목은 사람들이 질문에 대한 답변을 빨리 이해할 수 있도록 도와줍니다.</blockquote>

      </template>
      
       <v-text-field v-model="title" :counter="30" label="Title" required></v-text-field>
      
      
      <h2 class="mt-5"><v-icon class="mx-3" color="#FFA500">fas fa-check-circle</v-icon>귀하의 질문에 대해 더 알려주십시오</h2>
      <template>
      <blockquote class="blockquote">귀하의 설명은 사람들이 귀하의 질문에 답변하는 데 필요한 정보를 제공합니다.</blockquote>
      </template>
      

      <ImageUploader></ImageUploader>

      <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>

    <h2 class="mt-5"><v-icon class="mx-3" color="#FFA500">fas fa-check-circle</v-icon>어떤 언어, 기술 및 / 또는 프레임 워크에 대한 질문이 있습니까?</h2>
    <template>
      <blockquote class="blockquote">태그는 사람들이 귀하의 질문을 찾고 답변하는 데 도움이됩니다.</blockquote>
    </template>
    <v-combobox
          background-color ="#FAAC58"
          flat
          v-model="tag"
          :items="tags"
          chips
          clearable
          label="# Add tags"
          multiple
          solo
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click:close="tagDelete(item)"
            >
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </template>
        </v-combobox>

      <v-btn @click="postPost" color="pink darken-2" dark>
        <v-icon dark left>fas fa-edit</v-icon>Post
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import ImageUploader from "../components/ImageUploader";
import { md1 } from "../plugins/markdownit";

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
      itemz:"",
      img: "",
      imageFile: "",
      editor: "",
      tag: "",
      tags: [],
      message: "태그는 10자 이하, 10개 까지 가능해요",
      canAddTag: false,
    };
  },
  computed: {},

  created() {
    this.itemz = this.$route.params.item;
    FirebaseService.logging("new " + this.itemzz + " post");
  },

  methods: {
    async postPost() {
      let itemtag = '';
      const edit = await md1.render(this.content);
      
      // 작성한 포스트의 토큰값을 가져옴
      const res1 = await FirebaseService.postPost(this.itemz, this.title, edit);
      // tag = ['aaa','bbb','ccc'] 일 때
      await this.tag.forEach(async (item) => {

        // 'aaa' 태그의 post_token값을 읽어온다. (다른 게시글에도 태그가 있는경우)
        let res = await FirebaseService.getTag(item)

        // (태그가 있다면 내 토큰과 더함 ) 
        if (res) {
          res += `#${res1.id}`
        }
        else {
          res = res1.id
        }
        const res3 = await FirebaseService.addTag(item, res)
      })
      this.$router.go(-1)
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

.tag-body {
  margin: 20px 0px;
  width: 100w;
  overflow: auto;
  background: #eee;
}

/* .tag-content {
  display:inline-block;
  background:#e0e0e0;
  padding:5px;
  margin:5px;
  border-radius: 7px;
} */

.tag-delete {
  cursor: pointer;
  font-size: 18px;
}
</style>