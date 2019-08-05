<template>
  <v-container>
    <nav>
      <v-toolbar flat color="#FAFAFA" height="50">
        <v-toolbar-title>
          <span class="title">Question with bounties</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn-toggle v-model="text">
          <v-btn text value="all" flat>ALL</v-btn>
          <v-btn text value="ai" flat>AI</v-btn>
          <v-btn text value="bigdata" flat>BigData</v-btn>
          <v-btn text value="blockchain" flat>BlockChain</v-btn>
          <v-btn text value="webmobile" flat>Web/Mobile</v-btn>
        </v-btn-toggle>
      </v-toolbar>
      <span class="hr-line"></span>
      {{text}}
    </nav>
      <question-com></question-com>
  </v-container>
</template>

<script>
import questionCom from './questionCom'
export default {
  components:{
    questionCom,
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    showList(subject) {
      if (subject === "ALL") {
        console.log("gg");
      }
    }
  }
};
</script>

<style scoped>
.ib {
  display: inline;
}

.hr-line {
  display:flex;
  width:100%;
  height: 2px;
  background: black;
  justify-content: center;
}
</style>
