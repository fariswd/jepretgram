import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  loginStatus: false,
  userData: {
    userId: '',
    token: '',
    tokenfb: ''
  },
  jepret: []
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
    state.userData.tokenfb = ''
  },
  saveJepret: function (state, payload) {
    state.jepret.unshift(payload)
  },
  saveAllJepret: function (state, payload) {
    state.jepret = payload
  }
}

const actions = {
  checkLogin: function ({ commit }) {
    if (localStorage.getItem('userData')) {
      let userData = JSON.parse(localStorage.getItem('userData'))
      let tokenfb = userData.tokenfb
      axios.post('http://localhost:3000/api/signfb', [], {
        headers: { token: tokenfb }
      })
      .then(({ data }) => {
        if (data.msg === 'success') {
          console.log(data.token)
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
  },
  postNewJepret: function ({ commit }, newJepret) {
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.token
    axios.post('http://localhost:3000/api/jepret', {
      imageurl: newJepret.imageurl,
      caption: newJepret.caption
    }, {
      headers: { token: token }
    })
    .then(({ data }) => {
      commit('saveJepret', data.jepretPost)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getAllJeprets: function ({ commit }) {
    axios.get('http://localhost:3000/api/jepret')
    .then(({ data }) => {
      commit('saveAllJepret', data.jepretPost)
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
