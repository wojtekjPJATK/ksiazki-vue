<template>
    <div id="book-container">
        <book-item v-for="book in booksAll" :key="book.id" :book="book"></book-item>
        <add-book></add-book>
    </div>
</template>

<script>
import BookItem from "./BookItem";
import AddBook from './AddBook'

export default {
  name: "book-list",
  components: {
    BookItem,
    AddBook
  },
  created() {
    this.$store.dispatch("getBooks");
  },
  computed: {
    booksAll() {
      return this.$store.getters.booksAll;
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
