<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="pink lighten-1">
          <div class="admin-header">
            Admin-Page
          </div>
        </v-flex>
        <v-flex md3 xs6 class="indigo lighten-3">
          <div class="list-title">유저 목록</div>
        </v-flex>
        <v-flex md3 xs6 class="indigo lighten-3">
          <div class="list-title">권한</div>
        </v-flex>
        <v-flex md6 class="indigo lighten-3">
           <div class="list-title">게시글 수 총 : {{posts[0]+posts[1]+posts[2]+posts[3]}} 개</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md3 xs6 class="info lighten-3">
          <!-- <div class="gogo">
            <div class="user-l" v-for="user in userlist" :key="user" @click="authth">{{user.email}}</div>
          </div> -->

          <div class="gogo">
            <div class="user-l" v-for="user in userlist" :key="user.email">
              <input class="user-chk" type="radio" name="userlist" :id="user.email" @click="authth(user.email,user.created_at,user.level)">
              <label class="user-rdo" :for="user.email">{{user.email}}</label>
            </div>
          </div>
        </v-flex>
        <v-flex md3 xs6 class="info lighten-3">
          <input class="rdo" type="radio" id="auth-manager" name="auth" value="manager" @click="auththth('manager')">
          <label class="lbl" for="auth-manager">관리자</label><br>

          <input class="rdo" type="radio" id="auth-team" name="auth" value="team" @click="auththth('team')">
          <label class="lbl" for="auth-team">팀원</label><br>

          <input class="rdo" type="radio" id="auth-visitor" name="auth" value="visitor" @click="auththth('visitor')">
          <label class="lbl" for="auth-visitor">방문자</label><br>

          <br>
          <button @click="editUser">{{email}} {{auth}} 수정</button>
          
        </v-flex>
        <v-flex md6 class="info lighten-3">

          <div class="zz">
            <div class="posts-count">{{posts[0]}} 개</div>
            <div class="posts-subject">AI</div>
          </div>
          <div class="zz">
            <div class="posts-count">{{posts[1]}} 개</div>
            <div class="posts-subject">빅데이터</div>
          </div>
          <div class="zz">
            <div class="posts-count">{{posts[2]}} 개</div>
            <div class="posts-subject">블록체인</div>
          </div>
          <div class="zz">
            <div class="posts-count">{{posts[3]}} 개</div>
            <div class="posts-subject">웹/모바일</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <div>웹 로그 확인하러 가기</div>
    <a href="https://analytics.google.com/analytics/web/#/report-home/a144982861w206594667p199451962">클릭</a>

    <div :class="{notAdmin : !isAdmin}">
      <div class="user-list">
        <div class="user-list-title">
          <div>유저 목록</div>
        </div>
        <div class="user-list-content">
          {{ username }}
        </div>
      </div>

      <div class="authority-list">
        <div class="authority-list-title">
          <div>권한 변경</div>
        </div>
        <div class="authority-list-content">
          {{ auth }}
        </div>
      </div>

      <button>변경하기</button>

      <div class="post-list">
        <div class="post-list-total">
          <div>블록체인 게시글 수 : 00</div>
          <div>빅데이터 게시글 수 : 00</div>
          <div>웹모바일 게시글 수 : 00</div>
          <div>AI 게시글 수 : 00</div>
          <div>Total : 00</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'


export default {
  data(){
    return {
      isAdmin : false,
      level : '',
      auth: '',
      posts:[],
      userlist:[],
      email:'',
      created_at:'',
    }
  },
  methods: {
    authth(e,ee,eee){
      this.email = e
      this.created_at = ee
      this.level = eee
    },
    auththth(e){
      this.auth = e
    },
    editUser(){
      FirebaseService.update_database_member(this.email,this.auth,this.level,this.created_at)
      alert('수정완료')
    },
    track () {
      this.$ga.page('/')
    }
  },
  created() {
      ['AI','Bigdata','Blockchain','Webmobile'].forEach(subject => {
        FirebaseService.getPosts(subject).then(res => {
          this.posts.push(res.length)
          // console.log(this.posts)
        })
      })

      FirebaseService.getPosts('member').then(res => {
        res.forEach(item => {
          // console.log(item)
          this.userlist.push({email:item.email,authority:item.user_authority,created_at:item.created_at,level:item.level})
        })
        // console.log(this.userlist)
        })

}
}
</script>

<style scoped>
.notAdmin{
  display: none;
}

.rdo {
  display:none;
}

.rdo:checked + .lbl{
  background:red;
}

.user-chk {
  display: none;
}

.user-chk:checked + .user-rdo{
  background: tomato;
}

.user-rdo {
  width:100%;
  height:100%;
}

.gogo {
  height:150px;
  overflow:scroll;
}

/* .user-l:hover {
  background:red;
  cursor: pointer;
} */

.user-l:visited {
  background: blue;
}

.zz {
  display: inline-block;
  width: 50%;
  height:50%;
}

.admin-header {
  height:80px;
  font-size:4.2rem;
  text-align:center;
  border: 1px solid black;
  box-sizing:border-box;
}

.list-title {
  height:50px;
  padding:15px;
  border: 1px solid black;
  box-sizing:border-box;
}

.posts-count {
  font-size:20px;
  position:relative;
  top:30%;
  left:35%;
  
}
</style>
