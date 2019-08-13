<template>
  <v-container class="py-5 px-1">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="data in dataset" :key="data.title">


          <div class="card-border">
            <div class="card-title">
              <h2>{{ data.title }}</h2>
            </div>

            <div class="card-img">
              <v-img class="cg" :src="data.url" width="150"></v-img>
            </div>
            <div class="card-content">
              <p>{{ data.content}}</p>
            </div>
          </div>
      </v-flex>
      

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return{
      dataset: [
        {url:'https://cdn.sstatic.net/Img/teams/overview/knowledge.svg?v=b9c3cb8c2748', title:'What is StacOverflow', 
        content:'스택 오버플로는 전문가 및 애호가 프로그래머를위한 질문 및 답변 사이트입니다. Q & A 사이트의 Stack Exchange 네트워크의 일부로 사용자가 구축하고 실행합니다. 귀하의 도움으로 우리는 프로그래밍에 대한 모든 질문에 대한 자세한 답변 라이브러리를 구축하기 위해 협력하고 있습니다.'},
        {url:'https://cdn.sstatic.net/Img/teams/overview/onboard.svg?v=8e45e12e37ad', title:'Free up resources', 
        content:'개발자들은 오래된 문서, 이메일, 채팅 메시지 및 사람들의 머리 속에 묻힌 지식을 가지고 있습니다. 스택 오버플로는 질문과 답변을위한 공간을 제공하여  지식과 올바른 정보를 찾는 데 걸리는 시간을 줄일 수 있도록 합니다.'},
        {url:'https://cdn.sstatic.net/Img/teams/overview/resources.svg?v=0def07965383', title:'Unlock knowledge', 
        content:'같은 질문에 계속해서 답하는 것은 시간이 많이 걸립니다. 올바른 정보를 검색 할 수있게함으로써 개인 스택 오버플로 커뮤니티는 개발자가 더 나은 소프트웨어를 만드는 데 집중할 수 있습니다.'},
      ]
    }
  }

};
</script>

<style scoped>
.data-icon {
  height:100px;
  display:flex;
  justify-content: center;
}
h2{
font-family: 'Heebo', sans-serif;
color:#f27e35;
margin-bottom:20px;
}
.card-img{
  height:190px;
}
.card-content{
  height:180px;
}
.card-title{
  text-align:center;
}
.cg{
  margin:0px auto;
}
.card-border{
  /* background:black; */
  border:3px solid rgb(39,52,139);
  border-radius:15px;
  padding:15px;
  width:260px;
  margin:10px 10px;
}
</style>
