import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  loginStatus: false,
  userData: {
    userId: '',
    token: ''
  }
}

const mutations = {
  changeLoginStatus: function (state, payload) {
    console.log('di mutations', payload)
    state.userData = payload
    state.loginStatus = true
  }
}

const actions = {
  getFbAuth: function ({ commit }, tokenfb) {
    console.log('diactions', tokenfb)
    axios.post('http://localhost:3000/api/signfb', [], {
      headers: { token: tokenfb }
    })
    .then(({ data }) => {
      if (data.msg === 'success') {
        commit('changeLoginStatus', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
