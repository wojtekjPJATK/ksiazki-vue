// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import { store } from './store/store'
import firebase from 'firebase'
import 'firebase'

let app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router: router,
      components: { App },
      template: '<App/>',
      store: store
    })
  }
})
window.eventBus = new Vue()

Vue.config.productionTip = false

