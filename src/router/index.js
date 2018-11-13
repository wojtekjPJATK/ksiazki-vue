import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../components/static/LandingPage'
import App from '../App'
import BookList from '../components/list/BookList'
import FavoriteList from '../components/list/FavoriteList'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import firebase from 'firebase'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/books',
      component: BookList,
      name: 'books',
    },
    {
      path: '/favorites',
      component: FavoriteList,
      name: 'favorites',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      console.log('dostep chroniony -> login')
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else {
      next()
    }
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else {
      next()
    }
  }
  else next()
})

export default router
