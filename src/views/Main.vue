<template>
  <div style="background-color: white">
      <ImgBanner></ImgBanner>
    <!-- <naverLogin></naverLogin> -->
      <div style="height:10vh"></div>
      <mix-chart></mix-chart>
      <div style="height:10vh"></div>
    <board></board>
  </div>
</template>
<script>

import Login from '../components/Login'
import board from '../components/Board'
import mixChart from '../components/mixChart.vue'
import ImgBanner from "../components/ImgBanner"
import FirebaseService from '@/services/FirebaseService'



export default {
  name: 'Main',
   created:function(){
    FirebaseService.logging('main');
  },
  components: {
    mixChart,
    Login,
    board,
    ImgBanner,
  },
}
</script>

<style>

</style>
