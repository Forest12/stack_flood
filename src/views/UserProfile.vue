<template>
  <div>
    <v-container class="mb-5">
      <v-layout row wrap>
        <v-flex  justify-center>
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="primary lighten-2">
                <!-- <img :src="person.avatar" alt=""> -->
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">SubHeading</div>
              <div class="grey--text">Role</div>
            </v-card-text>

            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    <div>

      <a href="https://lab.ssafy.com/seungju/webmobile-sub2">Repository 이동</a>
    </div>

    <div class="mbx">
    <!-- <img src="../assets/images/s1.gif"> -->
    <mix-chart></mix-chart>
    </div>
    </v-container>

  </div>
</template>

<script>
import mixChart from '../components/mixChart.vue'
import FirebaseService from '@/services/FirebaseService'

export default {
  created:function(){
    FirebaseService.logging('uset profile');
  },
  components: {
    mixChart,
  }
}
</script>

<style>
.mbx{
  width:600px;
  height:400px;
}
</style>
