<template>
    <div>
        Books list
    </div>
</template>

<script>
export default {
    name: 'book-list',
    created() {
        console.log("created")
        this.$store.dispatch('getBooks')
    }
}
</script>

<style>

</style>

