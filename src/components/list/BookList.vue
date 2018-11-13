<template>
    <div id="book-container">
        <book-item v-for="book in booksAll" :key="book.id" :book="book"></book-item>
    </div>
</template>

<script>
import BookItem from './BookItem'

export default {
    name: 'book-list',
    components: {
        BookItem
    },
    created() {
        this.$store.dispatch('getBooks')
        // this.$store.dispatch('getFavorites')
    },
    computed: {
        booksAll() {
            return this.$store.getters.booksAll
        },
        // favoritesAll() {
        //     return this.$store.getters.favoritesAll
        // }
    },
    data() {
        return {
        }
    }
}
</script>

<style>
.book-item {
    margin-left: 20px;
    display: grid;
    grid-template-columns: 25% 25% 25% 70px 70px;
    border-collapse: collapse;
}
.item {
    padding: 10px;
    border: 1px solid;
}
</style>
