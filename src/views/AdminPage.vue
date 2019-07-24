<template>
  <div>
    관리자페이지입니다.

    {{$store.state.user.email}}

    <div :class="{notAdmin : !isAdmin}">
      보이게 안보이게?
    </div>

  </div>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
export default {
  data(){
    return {
      isAdmin : true,
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
</style>
