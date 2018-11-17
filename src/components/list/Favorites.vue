<template>
    <div id="book-container">
        <book-item v-for="book in favorites" :key="book.id" :book="book"></book-item>
    </div>
</template>

<script>
import BookItem from "./BookItem";

export default {
  name: "book-list",
  components: {
    BookItem
  },
  created() {
    this.$store.dispatch("getBooks");
  },
  computed: {
    favorites() {
      const books = this.$store.getters.booksAll;
      let favorites = [];
      books.forEach(book => {
        if (book.favorite) favorites.push(book);
      });
      return favorites;
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
.book-item {
  margin-left: 20px;
  display: grid;
  grid-template-columns: 100px 25% 25% 25% 70px 70px;
  border-collapse: collapse;
}
.item {
  padding: 10px;
  border: 1px solid;
}
</style>
