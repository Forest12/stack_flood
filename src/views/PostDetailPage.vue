<template>
  <div>
    <v-container>

       
    </v-container>
  </div>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
    name: 'PostDetailPage',
    data(){
        return{
            post_token: '',
            post:{},
        }
    },
	created(){
        this.post_token = this.$route.params.post_token;
    },
    mounted(){
        this.getPost(this.post_token)
    },
    methods:{
        async getPost(post_token) {
			this.post = await FirebaseService.getPost(post_token)
		},
    }
}
</script>
