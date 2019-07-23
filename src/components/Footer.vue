<template>

    <div class="footer">
      <weather
       api-key="bfbf1028ce23c6b4053b773996f5b7df"
       title="Weather"
       :latitude="lat"
       :longitude="lon"
       hide-header=true
       bar-color="#ffffff"
       text-color="#ffffff"
       language="en"
       units="uk" style="margin-top:30px">
   </weather>
   <div style="font-family: 'Do Hyeon', sans-serif; margin-top:-35px;">
     <p style="float: right; margin-right:2%">2019.07.08 ~</p>
     <a href="https://lab.ssafy.com/seungju/webmobile-sub2" style="color:white; float: right; margin-right:2%">made by team "OneTwoThree"</a>
   </div>
    </div>


</template>
<script>
import VueWeatherWidget from 'vue-weather-widget';
import 'vue-weather-widget/dist/css/vue-weather-widget.css';
export default {
  data(){
    return{
      lat: '',
      lon: ''
    }
  },
   components: {
       'weather': VueWeatherWidget
   },
   mounted(){
     var vm = this
     navigator.geolocation.getCurrentPosition(function(pos){
       vm.lat = pos.coords.latitude.toString();
       vm.lon = pos.coords.longitude.toString();
     })
   }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap');
.footer {
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: black;
   color: white;
   text-align: center;
}
</style>
