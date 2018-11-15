import Vue from "vue";
import Vuex from "vuex";
import { firebaseApp } from "../firebase";
import db from "../firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    books: [],
    user: localStorage.getItem("email") || null
  },
  getters: {
    booksAll(state) {
      return state.books;
    }
  },
  mutations: {
    getBooks(state, books) {
      state.books = books;
    },
    changeFavorite(state, book) {
      const index = state.books.findIndex(item => item.id == book.id);
      state.books.splice(index, 1, book);
    },
    addBook(state, book) {
      console.log(book);
      state.books.push({
        id: book.id,
        title: book.title,
        genre: book.genre,
        authors: book.authors,
        url: book.url
      });
    }
  },
  actions: {
    addBook(context, book) {
      let imageUrl;
      db.collection("book")
        .add({
          title: book.title,
          genre: book.genre,
          authors: book.authors
        })
        .then(doc => {
          const book = {
            id: doc.id,
            title: doc.title,
            genre: doc.genre,
            authors: doc.authors
          };
          return id;
        })
        .then(id => {
          firebaseApp
            .storage()
            .ref("covers/" + id)
            .put(book.image)
            .then(file => {
              imageUrl = file.metadata.fullPath;
              let bookRef = db.collection("book").doc(id);
              return bookRef.update({ url: imageUrl });
              // return firebaseApp.database.child('/book/' + id).update({url: imageUrl})
              // return db.child('/book/' + id).update({url: imageUrl})
            })
            .then(() => {
              context.commit("addBook", {
                ...book,
                url: imageUrl
              });
            });
        });
    },
    changeFavorite(context, id) {
      let book = context.state.books.find(item => item.id == id);
      book.favorite = !book.favorite;
      let user_id = false;
      let email = firebase.auth().currentUser.email;
      db.collection("user")
        .where("email", "==", localStorage.getItem("email").toString())
        .get()
        .then(qs => {
          let favorites = false;
          qs.forEach(doc => {
            favorites = doc.data().favorites;
            user_id = doc.id;
          });
          let index = favorites.findIndex(item => item == id);
          if (index != -1) favorites.splice(index, 1);
          else favorites.push(id);
          db.collection("user")
            .doc(user_id)
            .set(
              {
                favorites: favorites
              },
              { merge: true }
            )
            .then(() => {
              context.commit("changeFavorite", book);
            });
        });
    },
    getBooks(context) {
      var tmp = [];
      db.collection("book")
        .get()
        .then(qs => {
          let tmpBooks = [];
          qs.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              authors: doc.data().authors,
              genre: doc.data().genre,
              url: doc.data().url,
              favorite: false
            };
            tmpBooks.push(data);
          });
          const tmpBooksSorted = tmpBooks.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
          tmp = tmpBooksSorted;
        })
        .then(() => {
          db.collection("user")
            .where("email", "==", localStorage.getItem("email"))
            .get()
            .then(qs => {
              let favorites = [];
              qs.forEach(doc => {
                favorites = doc.data().favorites;
              });
              let books = [];
              tmp.forEach(book => {
                if (
                  favorites.some(x => {
                    return x == book.id;
                  })
                ) {
                  book.favorite = true;
                }
                books.push(book);
              });
              context.commit("getBooks", books);
            });
        });
    }
  }
});
