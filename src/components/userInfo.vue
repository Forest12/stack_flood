<template>
  <v-card flat class="text-xs-center post-card">
    <v-responsive class="pt-1">
      <v-avatar size="100">
        <v-img :src="userImg" alt=""></v-img>
      </v-avatar>
    </v-responsive>
    <v-card-text class="pt-2 pb-0">
      <div class="font-weight-medium subtitle-1 black--text username">
        
        <!-- 유저 이메일 -->
        <slot name="user-email">
          {{email}}
        </slot>

        </div>
      <div class=".body-2 grey--text mt-1">
      
        <!-- 유저 reputation -->
        <slot name="user-score">
          내공 : {{level}}
        </slot>

      </div>
    </v-card-text>

    <slot name="user-action">
      <v-card-actions class="pa-0 d-flex ms" justify-content-center>
        <v-btn flat color="grey">
          <v-icon small left>message</v-icon>
          <a v-if="giturl!='I\'m visiter'&&giturl!='no have giturl'" v-bind:href="'http://'+giturl">{{giturl}}</a>
          <a v-else>{{giturl}}</a>
        </v-btn>
      </v-card-actions>
    </slot>


</v-card>
</template>

<script>
export default { 
  props: {
    email: { type: String },
    giturl: { type: String },
    level: { type: String },
    userImg: { type: String },
  },
}
</script>

<style scoped>
.post-card{
  position:relative;
  top:50%;
  transform: translateY(-50%);
}

.ms{
  position:relative;
  transform:translateX(-10px);
}
</style>
