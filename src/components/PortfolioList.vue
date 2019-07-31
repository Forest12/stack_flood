<template>
  <v-layout row wrap mw-700>
    <v-flex v-for="i in portfolios.length > limits ? limits : portfolios.length" v-bind:key='i.title'  px-3>

      <Portfolio
	  			:id="portfolios[i - 1].id"
            	:date="portfolios[i - 1].created_at"
            	:title="portfolios[i - 1].title"
              	:content="portfolios[i - 1].content"
				:imgSrc="portfolios[i - 1].img">
      </Portfolio>
      <v-divider></v-divider>
    </v-flex>
</v-layout> 
</template>
<script>

import FirebaseService from '@/services/FirebaseService'
import Portfolio from './Portfolio'


export default {
	name: 'PortfolioList',
	  created:function(){
    FirebaseService.logging('portfolio');
  },
	props: {
        item:{type:String},
		column: {type: Number, default: 1},
		limits: {type: Number, default: 4},
		loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
			portfolios: []
		}
	},
	components: {
		Portfolio
	},
	mounted() {
		this.getPortfolios()
	},
	methods: {
		async getPortfolios() {
			this.portfolios = await FirebaseService.getPortfolios()
		},
	}
}

</script>
<style>
  .mw-700 {
    max-width: 700px;
    margin: auto;
  }
</style>
