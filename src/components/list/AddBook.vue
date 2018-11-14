<template>
    <div class="book-item">
        <div class="item">Title<input type="text" v-model="title" /></div>
        <div class="item">Genre<input type="text" v-model="genre" /></div>
        <div class="item">Author<input type="text" v-model="author" /></div>
        <div class="item"><img src="../../assets/add.png" alt="" v-on:click="addBook"/></div>
    </div>
</template>

<script>
export default {
  name: "add-book",
  data() {
    return {
      title: "",
      genre: "",
      author: ""
    };
  },
  methods: {
    addBook() {
      let authorsList = [];
      let tmpAuthors = this.author.split(", ");
      tmpAuthors.forEach(element => {
        authorsList.push(element);
      });
      this.$store.dispatch("addBook", {
        title: this.title,
        genre: this.genre,
        authors: authorsList
      });
    }
  }
};
</script>

<style scoped>
img {
  height: 35px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 5px;
}
</style>