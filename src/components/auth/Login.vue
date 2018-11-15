<template>
    <div>
    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel grey lighten-4 black-text center">
          <h3>Login</h3>
          <form>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email">
              <label class="gray-text" for="email">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password">
              <label class="gray-text" for="password">Password</label>
            </div>
            <button v-on:click="login" class="btn btn-large btn-extended grey darken+10 black-text">Login</button>
            <button v-on:click='gmailLogin' class='brn btn-large btn-extended blue white-text'>Login with Google</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    gmailLogin(e) {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(
          result => {
            localStorage.setItem("email", result.user.email);
            // TODO add user to the db
            this.$router.go({ path: this.$router.path });
            alert(err);
          },
          err => {
            console.log(err);
            alert(err);
          }
        );
      this.$router.go({ path: this.$router.path });
    },
    login(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("Signed in as " + this.email);
            localStorage.setItem("email", this.email);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            console.log(err);
            alert(err.message);
          }
        );
    }
  }
};
</script>


<style>
</style>
