<template>

<svg version="1.1" id="Layer_1" xmlns:svg="http://www.w3.org/2000/svg"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 640 480"
	 style="enable-background:new 0 0 640 480;" xml:space="preserve">

<circle class="st0" cx="261.8" cy="290.6" r="144"/>
<title>Check mark</title>
<title>Layer 1</title>
<g>
	<defs>
		<path id="path4068" d="M147.4,253.9l110.1,151.5C313.6,269.8,382.2,145,492.6,26.6C410,81.9,319,186.8,241.2,316.8L147.4,253.9
			L147.4,253.9z"/>
	</defs>
	<clipPath id="path4068_1_">
		<use xlink:href="#path4068"  style="overflow:visible;"/>
	</clipPath>
	<path class="st1" d="M147.4,253.9l103.9,122.6c0,0,101.8-240.3,241.4-349.9"/>
</g>
<path class="st2" d="M147.4,253.9"/>
</svg>

</template>

<script>
export default {
  mounted(){
  const obj = [document.querySelectorAll('.st1')]
    this.$anime({
      targets: obj,
      strokeDashoffset: [this.$anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
    })
  }
}
</script>

<style scoped>
	.st0{fill:none;stroke:#D3FF20;stroke-width:20;stroke-miterlimit:10;}
	.st1{clip-path:url(#path4068_1_);fill:none;stroke:#05FF18;stroke-width:100;stroke-miterlimit:10;}
	.st2{fill:none;stroke:#05FF18;stroke-width:100;stroke-miterlimit:10;}
</style>