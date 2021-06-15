<template>
  <section class="section">
    <div class="container">
      <div v-if="error.statusCode === 404">
        <h1 class="title is-3">
          Sorry, the page you were looking for was not found
        </h1>
        <ul>
          <li>Check that you typed in the correct address</li>
          <li>
            Go to the
            <nuxt-link to="/">home page</nuxt-link> and browse the site
          </li>
          <li>Or<nuxt-link to="/login"> login </nuxt-link></li>
        </ul>
      </div>
      <div v-else>
        <h1>An error has occured</h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error-layout',
  head() {
    return {
      title: 'Page not found',
    }
  },
}
</script>