import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddJepret from '@/components/AddJepret'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/jepret',
      component: AddJepret
    }
  ]
})
