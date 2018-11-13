import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../components/static/LandingPage'
import App from '../App'
import BookList from '../components/list/BookList'
import FavoriteList from '../components/list/FavoriteList'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Logout from '../components/auth/Logout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/books',
      component: BookList,
      name: 'books'
    },
    {
      path: '/favorites',
      component: FavoriteList,
      name: 'favorites'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
  ],
  mode: 'history'
})
