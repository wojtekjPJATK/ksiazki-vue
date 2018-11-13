<template>
    <div id="app">
        <ul class="nav">
            <li id="logo"><router-link :to="{ name: 'home' }"><img src="./assets/logo.png" alt=""/></router-link></li>
            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
            <li><router-link :to="{ name: 'books' }">Books</router-link></li>
            <li><router-link :to="{ name: 'favorites' }">Favorites</router-link></li>
            <li><router-link :to="{ name: 'login' }">Login</router-link></li>
            <li><router-link :to="{ name: 'register' }">Register</router-link></li>
            <li><router-link :to="{ name: 'logout' }">Logout</router-link></li>

        </ul>

        <router-view></router-view>

    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Montserrat', Helvetica, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #222;
    color: #aaa;
    font-size: 24px;
    height: 100vh;
  }
  .nav {
    display: flex;
    justify-content: flex-end;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    background: #222;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 24px;
  }
  .nav a {
    color: #aaa;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
  }
  .nav a:hover {
    color: whitesmoke;
  }

  .nav img {
    padding-right: 1050px;
    height: 40px;
  }
</style>
