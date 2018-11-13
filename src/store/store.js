import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        books: [],
        favorites: [],
        user: localStorage.getItem('email') || null
    },
    getters: {
        booksAll(state) {
            return state.books
        }

    },
    mutations: {
        getBooks(state, books) {
            state.books = books
        },
        getFavorites(state, favorites) {
            state.favorites = favorites
        }
    },
    actions: {
        getFavorites(context) {
            console.log(this.user)
            db.collection('user').where('email', '==', this.user)
            .then(qs => {
                let tmpFav = []
                qs.forEach(doc => {
                    const data = {

                    }
                })
            })
        },
        getBooks(context) {
            db.collection('book').get()
                .then(qs => {
                    let tmpBooks = []
                    qs.forEach(doc => {
                        const data = {
                            id: doc.id,
                            title: doc.data().title,
                            authors: doc.data().authors,
                            genre: doc.data().genre
                        }
                        tmpBooks.push(data)
                    })
                    const tmpBooksSorted = tmpBooks.sort((a, b) => {
                        if (a.title < b.title)
                            return -1;
                        if (a.title > b.title)
                            return 1;
                        return 0;
                    })
                    context.commit('getBooks', tmpBooksSorted)
                })
        }
    }
})