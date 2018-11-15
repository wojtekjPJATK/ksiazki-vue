<template>
    <div class="book-item add">
        <div class="upload-btn-wrapper item">
            <button class="btn">Cover</button>
            <input type="file" ref="fileInput" accept="image/*" @change="onFilePick" />
            <img id="preview" :src="imageUrl"/>
        </div>
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
      author: "",
      image: null,
      imageUrl: ""
    };
  },
  methods: {
    validateBook() {
      if (typeof this.title == String) return true;
    },
    addBook() {
      let authorsList = [];
      let tmpAuthors = this.author.split(", ");
      tmpAuthors.forEach(element => {
        authorsList.push(element);
      });
      let file = [];
      if (!validateBook()) {
        console.log("Invalid data in book");
        return;
      }
      this.$store.dispatch("addBook", {
        title: this.title,
        genre: this.genre,
        authors: authorsList,
        image: this.image
      });
    },
    onFilePick(event) {
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
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

#preview {
  width: auto;
  max-width: 100px;
  height: 100px;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  margin-left: -5px;
  padding: 0px 10px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

.btn:hover {
  cursor: pointer;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 50px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>