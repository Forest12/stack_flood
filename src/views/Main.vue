<template>
  <!-- <div style="background-color: white">
      <ImgBanner></ImgBanner> -->
    <!-- <naverLogin></naverLogin> -->
      <!-- <div style="height:10vh"></div>
      <mix-chart></mix-chart>
      <div style="height:10vh"></div>
    <board></board>
  </div> -->
  <div>
    <!-- 이미지 -->
    <div class="img-banner"></div>

    <!-- 카드 -->
   
    <introduce-card></introduce-card>


  </div>
</template>
<script>

import Login from '../components/Login'
import board from '../components/Board'
import mixChart from '../components/mixChart.vue'
import ImgBanner from "../components/ImgBanner"
import FirebaseService from '@/services/FirebaseService'

import introduceCard from '../components/introduceCard'


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
    introduceCard,
  },
}
</script>

<style>
.img-banner{
  width:100%;
  height:600px;
  background-image: url('./../assets/images/main.png');
  background-size: cover;
}
</style>
