import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        books = []
    },
    getters: {

    },
    mutations: {
        getBooks(state, books) {
            state.books = books
        }
    },
    actions: {
        getBooks(context) {
            db.collection('book').get()
            console.log("got data")
            context.commit('getBooks', [])
        }
    }
})