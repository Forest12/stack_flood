<template>
  <nav>
    <div class="nav-line">
      <span class="line"></span>
    </div>
    <v-toolbar color="#070F35" height="50">
      <!-- 툴바 타이틀 -->
      <v-toolbar-title class="white--text gohome" @click="gohome">
        <span class="font-weight-light title">Stack </span>
        <span class="font-weight-medium headline Flood-title">F</span>
        <span class="font-weight-regular title mr-3">lood</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- 어드민페이지 -->
        <v-btn
          router
          to="/admin"
          flat
          color="pink"
          dark
          v-on="on"
          :class="{notAdmin: $store.state.isAdmin}"
        >Admin Page</v-btn>

        <!-- 검색기능 -->
        <v-text-field
          label="Search"
          single-line
          solo
          append-icon="search"
          @click:append="gotoSearch"
          v-model="searcher"
          @keyup.enter="gotoSearch"
        ></v-text-field>

        <!-- 카테고리 -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat color="white" dark v-on="on">
              Gallery
              <v-icon right>arrow_drop_down</v-icon>
            </v-btn>
          </template>

          <v-list v-for="i in items" :key="i">
            <v-list-tile @click="go_path(i.item)">
              <v-list-tile-title>{{ i.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- 로그인 -->
        <Login></Login>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>


<script>
import Login from "./Login";
import ssafy from "./ssafy";
import FirebaseService from "../services/FirebaseService";

export default {
  name: "Navbar",
  data() {
    return {
      homepage: "/",
      items: [
        { title: "AI", item: "AI" },
        { title: "BigData", item: "Bigdata" },
        { title: "BlockChain", item: "Blockchain" },
        { title: "Web&Mobile", item: "Webmobile" },
        { title: "Q & A", item: "QnA" }
      ],
      path_item: "",
      isAdmin: false,
      searcher:'',
    };
  },
  computed: {},
  components: {
    ssafy,
    Login
  },
  methods: {
    getAlarm(){

    },
    go_path(item) {
      if (item === "QnA"){
        this.$router.push('/chatbot');
      } else {
        this.$router.push(`/post/${item}`);
      }
    },
    gohome() {
      this.$router.push("/");
    },
    gotoSearch(){
      this.$router.push({
        path:`/search/${this.searcher}`,
        query:{
          options:'title'
        }
      })
    }
  }
};
</script>

<style scoped>
.ssafy-logo {
  width: 150px;
  transition: all 1s;
  /* height:200px; */
}

.ssafy-logo:hover {
  cursor: pointer;
  opacity: 0.6;
}

.notAdmin {
  display: none;
}

.line {
  display: block;
  width: 100%;
  height: 10px;
  background: #f27e35;
  position: relative;
  top: 70%;
  /* bottom:37%; */
}

.nav-line {
  width: 100%;
  height: 10px;
  background: #070f35;
}

.Flood-title {
  color: #f27e35;
}

.gohome {
  cursor: pointer;
  transition: all 0.1s;
}

.gohome:hover {
  transform: scale(1.04, 1.04);
}
</style>