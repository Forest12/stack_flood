<template>
<v-container>
    <img :src="imageUrl" height="150" v-if="imageUrl" id="image" />
    <v-layout>
        <v-text-field
        label="Select Image"
         @click="pickFile"
        v-model="imageUrl"
        prepend-icon="attach_file"
    ></v-text-field>
    </v-layout>
    

    <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="getImgURL"/>
</v-container>
</template>
<script>

import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'ImageUploader',
	
	data() {
		return {
            imageUrl: "",
            imageName: "",
            imageFile: "",
		}
    },
    created(){
    },

    methods: {
        pickFile(){
            this.$refs.image.click()
        },

        getImgURL(e) {
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true)
            xmlHttpRequest.setRequestHeader("Authorization", "Client-ID 38e11911aeaa6ab")

            xmlHttpRequest.onreadystatechange = () => {
                if (xmlHttpRequest.readyState == 4) {
                    if (xmlHttpRequest.status == 200) {
                        var result = JSON.parse(xmlHttpRequest.responseText)
                        this.imageUrl = result.data.link    
                        alert("업로드 성공")
                        this.$emit('get_imgURL', this.imageUrl)
                    }
                    else {
                        alert("업로드 실패")
                    }
                }
            }

            const files = e.target.files
            if (files[0] !== undefined) {
                this.imageName = files[0].name
                
                if (this.imageName.lastIndexOf(".") <= 0) {
                    return;
                }
                const fr = new FileReader()
                fr.readAsDataURL(files[0])
                fr.addEventListener("load", () => {
                    xmlHttpRequest.send(files[0])
                })
            }
        },
    },

}
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
</style>