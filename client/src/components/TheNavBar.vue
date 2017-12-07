<template lang="html">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" :to="{ path: '/', params: {} }">Jepretgram</router-link>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
        <ul class="nav navbar-nav navbar-left">
          <li v-if="loginStatus"><router-link :to="{ path: '/jepret', params: {} }">Jepret New Moment</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!loginStatus"><button @click="getFbToken" class="btn margin-fix facebook-btn" type="button" name="button"><span class="fa fa-facebook-square"></span> Login with facebook</button></li>
          <li v-else >{{ userData.name }} <button @click="logout" type="button" class="btn btn-default margin-fix" name="button">logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'loginStatus',
      'userData'
    ])
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'getFbAuth',
      'logout'
    ]),
    getFbToken: function () {
      // eslint-disable-next-line
      FB.login((response) => {
        console.log(response)
        this.getUser(response.authResponse.accessToken)
      }, {
        scope: 'public_profile, email'
      })
    },
    getUser: function (tokenfb) {
      this.getFbAuth(tokenfb)
    }
  },
  created: function () {
    this.checkLogin()
  }
}
</script>

<style lang="css">
.margin-fix {
 margin-top: 3px;
}
.facebook-btn {

}
</style>
