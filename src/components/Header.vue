<template>
  <div class="header">
      <Navbar>
      </Navbar>
    </div>
</template>

<script>
import Login from './Login'
import Navbar from './NavBar'

export default ({
  data() {
      return {
    }
  },
  components: {
      Login,
      Navbar
   },
})

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Black+Han+Sans|Gugi&display=swap');
</style>
