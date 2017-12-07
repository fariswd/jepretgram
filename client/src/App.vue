<template>
  <div id="app">
    <the-nav-bar />
    <router-view/>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
export default {
  name: 'app',
  components: {
    TheNavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
