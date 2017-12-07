import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddJepret from '@/components/AddJepret'
import SingleJepret from '@/components/SingleJepret'
import EditJepret from '@/components/EditJepret'

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
    },
    {
      path: '/jepret/:id',
      component: SingleJepret
    },
    {
      path: '/jepret/:id/edit',
      component: EditJepret
    }
  ]
})
