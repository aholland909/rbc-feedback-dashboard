<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="~assets/RBCBannerLogo.png" alt="RBC Logo" />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="'/dashboard'">
        Dashboard
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <b-button @click="logout" v-if="user" type="is-primary">
          Log out
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch('logoutUser')
        .then(() => this.$router.go({ path: 'login' }))
    },
  },
}
</script>
