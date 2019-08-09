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
      let itemtag = [];
      const edit = await md1.render(this.content);
      
      // 작성한 포스트의 토큰값을 가져옴
      const res1 = await FirebaseService.postPost(this.itemz, this.title, edit);
      
      await this.tag.forEach(async (item) => {
        itemtag = [];
        let res = await FirebaseService.getTag(item)
        if (res) {
          itemtag.push(res)
        }
        itemtag.push(item)
        console.log(itemtag, res1.id)
        await FirebaseService.addTag(itemtag, res1.id)
      })

      
      // FirebaseService.addTag(this.tag, res1.id)

      this.$router.push(`/post/${this.itemz}/new`);
    },
  //   checktag() {
  //     const a = this.$refs.tag.$el;
  //     const b = a.querySelector("input");
  //     console.log(this.tag, this.tags, this.canAddTag);
  //     if (this.tag.length <= 10 && this.tags.length <= 10) {
  //       // 태그 중복검사
  //       if (this.tags.includes(this.tag)) {
  //         b.style.color = "red";
  //         this.message = "이미 있는 태그에요";
  //         this.canAddTag = false;
  //       }

  //       // 파이어베이스 태그 중복검사

  //       // 태그 제출 가능
  //       else {
  //         this.canAddTag = true;
  //         b.style.color = "black";
  //         this.message = "추가 가능해요";
  //       }
  //       this.canAddTag = true;
  //       b.style.color = "black";
  //       this.message = "추가 가능해요";
  //     } else if (this.tag.length > 10 && this.tags.length <= 10) {
  //       b.style.color = "red";
  //       this.message = "10자를 넘겼어요";
  //       this.canAddTag = false;
  //     } else if (this.tags.length > 10) {
  //       b.style.color = "red";
  //       this.message = "태그가 10개에요";
  //       this.canAddTag = false;
  //     }
  //   },
  //   // 엔터를 누를 때 태그 추가
  //   addtag(v) {
  //     const a = this.$refs.tag.$el;
  //     const b = a.querySelector("input");
  //     if (this.canAddTag) {
  //       b.style.color = "black";
  //       this.tags.push(this.tag);
  //       this.tag = "";
  //       this.message = "태그 추가 완료";
  //       this.canAddTag = false;
  //     }
  //   },
  //   tagDelete(item) {
  //     console.log('시발')
  //     this.tag.slice(this.tag.indexOf(item),1);
  //   }
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