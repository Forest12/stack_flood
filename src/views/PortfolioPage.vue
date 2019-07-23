<template>
  <div>

    <!-- Post list -->
    <v-container>
        <v-btn  @click="newPortfolio" color="primary" dark ><v-icon dark left small>fas fa-edit</v-icon>New</v-btn>

        <v-layout>
        <v-flex >
            <PortfolioList  :item="item" :limits="10" :load-more="true" xs4></PortfolioList>
            <h2>{{item}}</h2>
        </v-flex>
      </v-layout>
      
    </v-container>
  </div>
</template>

<script>

import PortfolioList from '../components/PortfolioList'
import ImgBanner from "../components/ImgBanner"

export default {
    name: 'PortfolioPage',
    data(){
        return{
            item:""
        }
    },  
	components: {
    PortfolioList,
    
    ImgBanner

  },
  methods:{
    newPortfolio(){
      this.$router.push("/portfolio/new");
    }

  }
}
</script>
