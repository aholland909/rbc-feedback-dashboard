<template>
  <section class="section">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <form class="box">
          <h1 class="title is-3">Login</h1>
          <b-field label="Username">
            <b-input
              v-model="username"
              @keydown.native.enter="loginUser"
            ></b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="password"
              @keydown.native.enter="loginUser"
              password-reveal
            >
            </b-input>
          </b-field>
          <b-button type="is-primary" @click="loginUser">Login</b-button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'login',
  head() {
    return {
      title: 'Login',
    }
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    loginUser() {
      if (this.username == '' || this.password == '') {
        this.popupError('Please enter a username or password')
        return
      }

      axios
        .get(process.env.rbcapi + 'api/login/', {
          headers: {
            Authorization:
              'Basic ' +
              Buffer.from(this.username + ':' + this.password).toString(
                'base64'
              ),
          },
        })
        .then((response) => {
          //store data token in nuxt store
          var user = {
            username: this.username,
            token: response.data.token,
            time: new Date(),
          }
          this.$store.commit('login', user)
          this.username = ''
          this.password = ''

          //redirect to home
          this.$router.push({
            path: '/',
          })
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.popupError('Incorrect username or password')
          }
          return error
        })
    },
    popupError(inputMessage) {
      this.$buefy.toast.open({
        message: inputMessage,
        type: 'is-danger',
      })
    },
  },
}
</script>