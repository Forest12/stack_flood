<template>
  <div>
    관리자페이지입니다.

    {{$store.state.user.email}}

    <div :class="{notAdmin : !isAdmin}">
      <div class="user-list">
        <div class="user-list-title">
          <div>유저 목록</div>
        </div>
        <div class="user-list-content">
          <input type="radio" id="user-1" name="username" value="유저1" v-model="username">
          <label for="user-1">유저1</label>
          <input type="radio" id="user-2" name="username" value="유저2" v-model="username">
          <label for="user-2">유저2</label>
          <input type="radio" id="user-3" name="username" value="유저3" v-model="username">
          <label for="user-3">유저3</label>
          {{ username }}

        </div>
      </div>

      <div class="authority-list">
        <div class="authority-list-title">
          <div>권한 변경</div>
        </div>
        <div class="authority-list-content">
          <input class="rdo" type="radio" id="auth-manager" name="auth" value="manager" v-model="auth">
          <label class="lbl" for="auth-manager">관리자</label>
          <input class="rdo" type="radio" id="auth-team" name="auth" value="team" v-model="auth">
          <label class="lbl" for="auth-team">팀원</label>
          <input class="rdo" type="radio" id="auth-visitor" name="auth" value="visitor" v-model="auth">
          <label class="lbl" for="auth-visitor">방문자</label>
          
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
    }
  },
  created() {
    if (this.$store.state.user.email !== 'admin'){
      alert("Admin 계정만 접근 가능합니다.");
      console.log('ggjgjgj')
      FirebaseService.getPosts('member').then(res => 
        console.log(res[0].user_authority))
      // this.isAdmin = false
    } else {

    }
    
  }

  // created() {
  //   this.data_title.forEach(subject => {
  //     FirebaseService.getPosts(subject).then(res => {
  //       res.forEach(item => {
  //         if (this.collection[subject].length < 3){
  //         this.collection[subject].push({
  //           title : item.title,
  //           created_at : moment(item.created_at).format("YYYY-MM-DD"),
  //         })
  //         }
  //       })
  //     })
  //   })
  // },
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




</style>
