<template lang="html">
  <div class="container">
    <form class="form-horizontal" v-on:submit.prevent="sendJepret">
      <fieldset>
        <legend>Legend</legend>
        <div class="form-group">
          <label for="imageurl" class="col-lg-2 control-label">Imageurl</label>
          <div class="col-lg-10">
            <input v-model="newJepret.imageurl" class="form-control" id="imageurl" placeholder="http://blabla.com/this-is-file.jpg" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="caption" class="col-lg-2 control-label">Caption</label>
          <div class="col-lg-10">
            <input v-model="newJepret.caption" class="form-control" id="caption" placeholder="Your caption" type="text">
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button type="reset" class="btn btn-default">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: function () {
    return {
      newJepret: {
        imageurl: '',
        caption: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'postNewJepret'
    ]),
    sendJepret: function () {
      this.postNewJepret(this.newJepret)
    }
  }
}
</script>

<style lang="css">
</style>
