<template lang="html">
  <div class="home">
    <div class="container">
      <h1>Home Jepreters</h1>
      <div class="panel panel-default" v-for="j in jepret">
        <div class="panel-heading">
          {{ j.userId.name }}
          <p>{{ j.createdAt }}</p>
        </div>
        <div class="panel-body">
          <img class="img-responsive" :src="j.imageurl" alt="">
          <p>
            <div class="pull-right">
              <button @click="goEdit(j)" class="btn btn-link" type="button" name="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
              <button @click="goDelete(j)" class="btn btn-link" type="button" name="button"><i class="fa fa-trash" aria-hidden="true"></i></button>
              <button @click="goShare(j)" class="btn btn-link" type="button" name="button"><i class="fa fa-external-link" aria-hidden="true"></i></button>
            </div>
            <button @click="goLove(j)" class="btn btn-link" type="button" name="button"><i class="fa fa-heart" aria-hidden="true"></i></button>
            <button @click="goLove(j)" class="btn btn-link" type="button" name="button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
          </p>
        </div>
        <div class="panel-footer">
          {{ j.caption }}
        </div>
      </div>
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
      'getAllJeprets',
      'delJepret'
    ]),
    goEdit: function (jepret) {
      this.$router.push('/jepret/' + jepret._id + '/edit')
    },
    goDelete: function (jepret) {
      this.delJepret(jepret)
    },
    goShare: function (jepret) {
      this.$router.push('/jepret/' + jepret._id)
    },
    goLove: function (jepret) {
      console.log(jepret)
    }
  },
  created: function () {
    this.getAllJeprets()
  }
}
</script>

<style lang="css">
</style>
