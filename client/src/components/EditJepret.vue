<template lang="html">
  <div class="container">
    <form class="form-horizontal" v-on:submit.prevent="editJepret">
      <fieldset>
        <legend>Edit Jepret</legend>
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
import { mapState, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      newJepret: {
        imageurl: '',
        caption: ''
      }
    }
  },
  computed: {
    ...mapState([
      'singleJepret'
    ])
  },
  methods: {
    ...mapActions([
      'editedJepret',
      'getJepret'
    ]),
    editJepret: function () {
      this.editedJepret(this.newJepret)
      this.$router.push('/jepret/' + this.$route.params.id)
    }
  },
  created: function () {
    this.getJepret(this.$route.params.id)
    this.newJepret.imageurl = this.singleJepret.imageurl
    this.newJepret.caption = this.singleJepret.caption
  }
}
</script>

<style lang="css">
</style>
