<template lang="html">
  <div class="">
    <div class="container">
      <div class="panel panel-default"">
        <div class="panel-heading">
          {{ singleJepret.userId.name }}
          <p>{{ singleJepret.createdAt }}</p>
        </div>
        <div class="panel-body">
          <img class="img-responsive" :src="singleJepret.imageurl" alt="">
          <p>
            <div class="pull-right">
              <button @click="goEdit(singleJepret)" class="btn btn-link" type="button" name="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
              <button @click="goDelete(singleJepret)" class="btn btn-link" type="button" name="button"><i class="fa fa-trash" aria-hidden="true"></i></button>
              <button @click="goShare(singleJepret)" class="btn btn-link" type="button" name="button"><i class="fa fa-external-link" aria-hidden="true"></i></button>
            </div>
            <button @click="goLove(singleJepret)" class="btn btn-link" type="button" name="button"><i class="fa fa-heart" aria-hidden="true"></i></button>
            <button @click="goLove(singleJepret)" class="btn btn-link" type="button" name="button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
          </p>
        </div>
        <div class="panel-footer">
          {{ singleJepret.caption }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'singleJepret'
    ])
  },
  methods: {
    ...mapActions([
      'getJepret',
      'delJepret'
    ]),
    goEdit: function (jepret) {
      this.$router.push('/jepret/' + jepret._id + '/edit')
    },
    goDelete: function (jepret) {
      this.delJepret(jepret)
      this.$router.push('/')
    },
    goShare: function (jepret) {
      this.$router.push('/jepret/' + jepret._id)
    },
    goLove: function (jepret) {
      console.log(jepret)
    }
  },
  created: function () {
    this.getJepret(this.$route.params.id)
  }
}
</script>

<style lang="css">
</style>
