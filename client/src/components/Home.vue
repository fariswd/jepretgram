<template lang="html">
  <div class="home">
    <div class="container">
      <h1>ini Home</h1>
      {{ jepret }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'jepret'
    ])
  },
  methods: {
    ...mapActions([
      'getAllJeprets'
    ])
  },
  created: function () {
    this.getAllJeprets()
  }
}
</script>

<style lang="css">
</style>
