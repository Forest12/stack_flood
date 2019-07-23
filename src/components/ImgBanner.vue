<template>
    <div>
      <Carousel3d
        v-if="!check"
        :controls-visible="true"  
        :border="0"
        :space="400"
        :display="3" 
        :startIndex="8"
        :height="500"
        >

        <Slide v-for="i in portfolios.length" :index="i" :key="i">
         <v-card>
            <v-img
              :src="portfolios[i - 1].img"
              aspect-ratio="1.5"
              style="{heignt:150px}"
            ></v-img>

            <v-card-title primary-title style="heignt:150px">
              <div>
                <h3 class="headline mb-0">{{ portfolios[i - 1].title }}</h3>
                <div> {{ portfolios[i - 1].content }} </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="#084035">Share</v-btn>
              <v-btn flat color="#084035">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </Slide>
      </Carousel3d>

      <v-img gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.33)" 
        v-if="check" :src="imageURL" 
        height="540"
        :aspect-ratio="2.75">
        <v-layout align-center justify-center row fill-height>
          <v-flex text-xs-center>
            <!-- <span class="text-shadow display-2 font-weight-light">
              Better late than never
            </span> -->
            <div class="it">
            <img-title></img-title>
            </div>
          </v-flex>
        </v-layout>
      </v-img>


      <v-btn @click="changebanner" fab dark color="pink" absolute top withd="20" class="mt-5 ml-2"><v-icon dark>add</v-icon></v-btn>
      <div id="google_translate_element"></div>
    </div>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import { Carousel3d, Slide } from 'vue-carousel-3d'
import imgTitle from './imgTitle.vue'
import axios from 'axios'
import { setTimeout } from 'timers';



export default {
  
  name: 'ImgBanner',
  data(){
    return{
      check: true,
      //true-my portfolio false-random Image
      button:{
        text:"",
      },
      portfolios:[],
      imageURL:'',
      isPrinted:false,
    }
  },
  components:{
    imgTitle,
    Carousel3d,
    Slide,
    imgTitle,
  },
  mounted() {
		this.getPortfolios()
	},
  methods:{
    changebanner(){
      this.check = !this.check
    },
    async getPortfolios() {
			this.portfolios = await FirebaseService.getPortfolios()
    },
  },
  created() {
      axios.get('https://source.unsplash.com/random')
        .then(res => {
          this.imageURL = res.request.responseURL;
  })
  }
}
</script>
<style>

.carousel-3d-slide{
  padding: 5px;
  border-color:#084035;
  border-radius: 2%;
}
.v-card__title{
  height: 202px;
}

.google_translate_element{
  display:inline;
  position: fixed;
  top:20px;

  z-index:1;
}
.it {
  /* display:block; */
  width:800px;
  margin:0px auto;
  /* display: flex; */
  /* justify-content: center; */
}

</style>
