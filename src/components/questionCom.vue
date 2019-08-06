<template>
  <div class="q-container">
    <div class="q-body" v-for="question in questionser" :key="question.index">
      <!-- votes, answer, views  -->
      <div class="q-score">
        <div class="q-score-votes">
          <span class="headline">{{ question.voted }}</span>
          <br />
          <span class="subtitle-1">votes</span>
        </div>

        <div
          :class="{ answerChecked : question.is_checked, answerNotChecked: !question.is_checked}"
        >
          <span class="headline">{{ question.answers }}</span>
          <br />
          <span class="subtitle-1">answers</span>
        </div>

        <div class="q-score-views">
          <span class="subtitle-2">{{ question.views }} views</span>
        </div>
      </div>

      <!-- title, content, tag -->
      <div class="q-content">
        <div class="q-content-title">
          <div class="q-content-header">
            <span class="q-content-reputation">+ {{ question.reputation }}</span>
            <span class="q-content-title ml-2 title blue--text">{{ question.title }}</span>
          </div>
        </div>

        <div class="q-content-content py-2">{{ question.content }}</div>

        <div class="q-content-tag">
          <span
            class="q-content-tag-item blue lighten-4 mr-2 mb-1"
            v-for="tag in question.tags"
            :key="tag.index"
          >{{ tag }}</span>
        </div>

        <!-- user_info -->
        <div class="q-user">
          <div class="q-user-date caption grey--text">{{ question.created_at}} 에 질문했습니다.</div>
          <v-icon>perm_identity</v-icon>
          {{ question.asked_user}}
        </div>
      </div>

      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionser: [
        {
          voted: 6,
          answers: 2,
          views: 83,
          reputation: 50,
          is_checked: false,
          title: "Why would you append a shard ID to a generated ID?",
          content:
            "i'am reading this: https://instagram-engineering.com/asjdkfljlksdajfkl sjdklfjasdklfjklsd jsklfj lej elrj iowejr iweonr owein rwekon rlkwe",
          tags: [
            "database",
            "facebook",
            "instagram",
            "sharding",
            "id-generation",
            "database",
            "facebook",
            "instagram",
            "sharding",
            "id-generation"
          ],
          created_at: '19.08.05 18:15',
          asked_user: 'Kim W mak',
          user_point: 5050
        },

        {
          voted: 6,
          answers: 2,
          views: 83,
          reputation: 50,
          is_checked: true,
          title: "W4hy would you append a shard ID to a generated ID?",
          content:
            "집에갈래 집에갈래 집에갈래 집에가고싶어 집에갈래 집에갈래 집에갈래 집에가고싶어 집에갈래 집에갈래 집에갈래 집에가고싶어 집에갈래 집에갈래 집에갈래 집에가고싶어 집에갈래 집에갈래 집에갈래 집에가고싶어 집에갈래 집에갈래 집에갈래 집에가고싶어 집에갈래 집에갈래 집에갈래 집에가고싶어 집에갈래 집에갈래 집에갈래 집에가고싶어",
          tags: [
            "database",
            "facebook",
            "instagram",
            "sharding",
            "id-generation"
          ],
          created_at: '19.08.05 18:15',
          asked_user: 'Kim W mak',
          user_point: 5050
        },

        {
          voted: 6,
          answers: 2,
          views: 83,
          reputation: 50,
          is_checked: false,
          title: "Whwy would you append a shard ID to a generated ID?",
          content:
            "i'am reading this: https://instagram-engineering.com/asjdkfljlksdajfkl sjdklfjasdklfjklsd jsklfj lej elrj iowejr iweonr owein rwekon rlkwe",
          tags: [
            "database",
            "facebook",
            "instagram",
            "sharding",
            "id-generation"
          ],
          created_at: '19.08.05 18:15',
          asked_user: 'Kim W mak',
          user_point: 5050
        }
      ]
    };
  }
};
</script>

<style scoped>
.q-container {
  padding: 30px;
}

.q-body {
  height: 180px;
  padding: 3px;
}

/* votes, answers, views */
.q-score {
  float: left;
  width: 80px;
  height: 100%;
}

.q-score-votes {
  /* background:blue; */
  height: 35%;
  padding-top: 10px;
  padding-bottom: 3px;
  text-align: center;
}

.answerChecked {
  background: green;
  height: 40%;
  border: 1px solid green;
  text-align: center;
  padding: 5px;
  border-radius: 7px;
  color: white;
  margin-top: 10px;
}

.answerNotChecked {
  height: 40%;
  border: 1px solid green;
  text-align: center;
  padding: 5px;
  border-radius: 7px;
  color: black;
  margin-top: 10px;
}

.q-score-views {
  height: 20%;
  text-align: center;
  padding: 12px;
}

/* title, content, tags */
.q-content {
  padding: 15px;
  float: left;
  width: 90%;
  height: 100%;
}

.q-content-header {
  transition: all 0.2s;
  cursor: pointer;
}

.q-content-header:hover {
  transform: translateX(4px);
}

.q-content-content {
  margin:3px 0px;
  overflow: hidden;
  white-space: normal;
  line-height: 1.5;
  height: 3.6em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.q-content-reputation {
  padding: 5px;
  color: white;
  background: blue;
  border-radius: 5px;
  font-size: 13px;
  position: relative;
  bottom: 3px;
}

.q-content-tag {
  float: left;
  padding: 0px;
  margin-top:3px;
  width: 60%;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;


}

.q-content-tag-item {
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  color: #0d47a1;
}

.q-user {
  padding:5px;
  float: left;
  width: 40%;
  height: 80px;
}
</style>
