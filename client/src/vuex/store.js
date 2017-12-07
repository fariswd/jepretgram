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
    state.userData = payload
    state.loginStatus = true
  },
  clearData: function (state) {
    state.loginStatus = false
    state.userData.userId = ''
    state.userData.token = ''
  }
}

const actions = {
  checkLogin: function ({ commit }) {
    if (localStorage.getItem('userData')) {
      let tokenfb = JSON.parse(localStorage.getItem('userData')).token
      axios.post('http://localhost:3000/api/signfb', [], {
        headers: { token: tokenfb }
      })
      .then(({ data }) => {
        if (data.msg === 'success') {
          localStorage.setItem('userData', JSON.stringify(data))
          commit('changeLoginStatus', data)
        }
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      localStorage.removeItem('userData')
      commit('clearData')
    }
  },
  getFbAuth: function ({ commit }, tokenfb) {
    axios.post('http://localhost:3000/api/signfb', [], {
      headers: { token: tokenfb }
    })
    .then(({ data }) => {
      if (data.msg === 'success') {
        localStorage.setItem('userData', JSON.stringify(data))
        commit('changeLoginStatus', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  logout: function ({ commit }) {
    localStorage.removeItem('userData')
    commit('clearData')
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
