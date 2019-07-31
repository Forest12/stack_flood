<template>
<v-container>
    <img :src="imageUrl" height="150" v-if="imageUrl" id="image" />
    <v-text-field
        label="Select Image"
         @click="pickFile"
        v-model="imageName"
        prepend-icon="attach_file"
    ></v-text-field>

    <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
    />
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
        this.item = this.$route.params.item;
    },

    methods: {
        pickFile(){
            this.$refs.image.click()
        },

        onFilePicked(e) {
            const files = e.target.files
            if (files[0] !== undefined) {
                this.imageName = files[0].name
                
                if (this.imageName.lastIndexOf(".") <= 0) {
                    return;
                }
                const fr = new FileReader()
                fr.readAsDataURL(files[0])
                fr.addEventListener("load", () => {
                this.imageUrl = fr.result
                this.imageFile = files[0]
                this.$emit('gotimg',this.imageFile);
                })
            } 
        }

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