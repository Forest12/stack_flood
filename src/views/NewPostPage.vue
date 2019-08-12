<template>
  <v-container>
    <h2 class="headline my-5 text-xs-center">New Post</h2>

    <v-form>
      <v-text-field v-model="title" :counter="30" label="Title" required></v-text-field>

      <ImageUploader></ImageUploader>

      <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>


      <v-combobox
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
        {{ tag }}

        {{ tags }}
      <!-- <v-tooltip bottom> -->

        <!-- <v-text-field
          width="200px"
          ref="tag"
          slot="activator"
          @input="checktag"
          v-model="tag"
          :counter="100"
          label="# Add Tags"
          @keyup.enter="addtag"
        ></v-text-field>


        <span>{{ message }}</span>
      </v-tooltip> -->

      <!-- <div class="tag-body">
        <div v-for="(t,index) in tags" :key="t" class="tag-content">
          <v-chip class="ma-2" close @click:close="tagDelete(index)"> {{ t }}</v-chip> -->

          <!-- {{ t }} <v-icon class="tag-delete" @click="tagDelete(index)">close</v-icon> -->
        <!-- </div> -->
      <!-- </div> -->

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