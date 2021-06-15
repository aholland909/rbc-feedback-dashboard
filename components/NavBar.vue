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
      <b-navbar-item v-if="user" tag="div">
        <b-button @click="logout" type="is-primary"> Log out </b-button>
      </b-navbar-item>
       <b-navbar-item v-else tag="router-link" :to="{ path: '/login' }">
        <b-button type="is-primary"> Log in </b-button>
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
