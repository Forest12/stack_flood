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
           <div class="list-title">게시글 수 총 : nn 개</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md3 xs6 class="info lighten-3">
          <div class="gogo">
            <input type="radio" id="user-1" name="username" value="유저1" v-model="username">
            <label for="user-1">유저1</label>
            <input type="radio" id="user-2" name="username" value="유저2" v-model="username">
            <label for="user-2">유저2</label>
            <input type="radio" id="user-3" name="username" value="유저3" v-model="username">
            <label for="user-3">유저3</label>

          </div>
        </v-flex>
        <v-flex md3 xs6 class="info lighten-3">
          <input class="rdo" type="radio" id="auth-manager" name="auth" value="manager" v-model="auth">
          <label class="lbl" for="auth-manager">관리자</label>
          <input class="rdo" type="radio" id="auth-team" name="auth" value="team" v-model="auth">
          <label class="lbl" for="auth-team">팀원</label>
          <input class="rdo" type="radio" id="auth-visitor" name="auth" value="visitor" v-model="auth">
          <label class="lbl" for="auth-visitor">방문자</label>
          
        </v-flex>
        <v-flex md6 class="info lighten-3">

          <div class="zz">
            <div class="posts-count">nn개</div>
            <div class="posts-subject">빅데이터</div>
          </div>
          <div class="zz">
            <div class="posts-count">nn개</div>
            <div class="posts-subject">빅데이터</div>
          </div>
          <div class="zz">
            <div class="posts-count">nn개</div>
            <div class="posts-subject">빅데이터</div>
          </div>
          <div class="zz">
            <div class="posts-count">nn개</div>
            <div class="posts-subject">빅데이터</div>
          </div>


        </v-flex>
      </v-layout>
    </v-container>



   

    <div :class="{notAdmin : !isAdmin}">
      <div class="user-list">
        <div class="user-list-title">
          <div>유저 목록</div>
        </div>
        <div class="user-list-content">
          <!-- <input type="radio" id="user-1" name="username" value="유저1" v-model="username">
          <label for="user-1">유저1</label>
          <input type="radio" id="user-2" name="username" value="유저2" v-model="username">
          <label for="user-2">유저2</label>
          <input type="radio" id="user-3" name="username" value="유저3" v-model="username">
          <label for="user-3">유저3</label> -->
          {{ username }}

        </div>
      </div>

      <div class="authority-list">
        <div class="authority-list-title">
          <div>권한 변경</div>
        </div>
        <div class="authority-list-content">
          <!-- <input class="rdo" type="radio" id="auth-manager" name="auth" value="manager" v-model="auth">
          <label class="lbl" for="auth-manager">관리자</label>
          <input class="rdo" type="radio" id="auth-team" name="auth" value="team" v-model="auth">
          <label class="lbl" for="auth-team">팀원</label>
          <input class="rdo" type="radio" id="auth-visitor" name="auth" value="visitor" v-model="auth">
          <label class="lbl" for="auth-visitor">방문자</label> -->
          
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
      isAdmin : true,
      username : '',
      auth: '',
      posts:[],
    }
  },


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

.gogo {
  height:150px;
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
