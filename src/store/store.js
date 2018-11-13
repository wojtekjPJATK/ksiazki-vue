import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        books: [],
        user: localStorage.getItem('email') || null
    },
    getters: {
        booksAll(state) {
            return state.books
        },
    },
    mutations: {
        getBooks(state, books) {
            state.books = books
        },
    },
    actions: {
        getBooks(context) {
            var tmp = []
            db.collection('book').get()
                .then(qs => {
                    let tmpBooks = []
                    qs.forEach(doc => {
                        const data = {
                            id: doc.id,
                            title: doc.data().title,
                            authors: doc.data().authors,
                            genre: doc.data().genre,
                            favorite: false
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
                    tmp = tmpBooksSorted
                })
                .then(() => {
                    db.collection('user').where('email', '==', localStorage.getItem('email').toString()).get()
                    .then(qs => {
                        let favorites = []
                        qs.forEach(doc => {
                            favorites = doc.data().favorites
                        })
                        let books = []
                        tmp.forEach(book => {
                            if(favorites.some((x) => {
                                return x == book.id
                            })) {
                                book.favorite = true
                            }
                            books.push(book)
                        })
                        context.commit('getBooks', books)
                    })
                })
        }
    }
})