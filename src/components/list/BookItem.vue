<template>
    <div class="book-item">
        <div class="item">{{ title }}</div> 
        <div class="item">{{ genre }}</div>
        <div class="item"><div v-for="author in authors" :key="author.id">{{ author }}</div></div>
        <div class="item" id="fav">
            <img v-if="!favorited" src="../../assets/fav.png" alt="" v-on:click="changeFavorite(id)"/>
            <img v-else src="../../assets/favC.png" alt="" v-on:click="changeFavorite(id)" />
        </div>
    </div>
</template>

<script>
export default {
  name: "book-item",
  props: {
    book: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      id: this.book.id,
      title: this.book.title,
      authors: this.book.authors,
      genre: this.book.genre,
      favorited: this.book.favorite
    };
  },
  methods: {
    changeFavorite(id) {
      this.favorited = !this.favorited
      this.$store.dispatch('changeFavorite', id)
    }
  },
  watch: {
    book() {
      this.title = this.book.title
      this.authors = this.book.authors
      this.genre = this.book.genre
      this.favorited = this.book.favorite
    }
  }
};
</script>

<style scoped>
img {
  height: 25px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
