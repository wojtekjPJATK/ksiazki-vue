<template>
    <div class="app">
        <ul class="nav">
            <li id="logo"><router-link :to="{ name: 'home' }"><img src="./assets/logo.png" alt=""/></router-link></li>
            <li v-if="isLoggedIn"><span class="email gray-text">{{currentUser}}</span></li>
            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
            <li v-if="isLoggedIn"><router-link :to="{ name: 'books' }">Books</router-link></li>
            <li v-if="!isLoggedIn"><router-link :to="{ name: 'login' }">Login</router-link></li>
            <li v-if="!isLoggedIn"><router-link :to="{ name: 'register' }">Register</router-link></li>
            <li v-if="isLoggedIn"><button v-on:click="logout" class="btn gray">Logout</button></li>

        </ul>

        <router-view></router-view>

    </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("email");
          this.$router.go({ path: this.$router.path });
        },
        err => {
          alert(err.message)
        });
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Montserrat", Helvetica, Arial;
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
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}
.nav a:hover {
  color: whitesmoke;
}

.nav img {
  position: absolute;
  left: 20px;
  height: 40px;
}

.email {
  font-size: 14px;
}
label {
  margin-top: -15px;
}
</style>
