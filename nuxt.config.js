export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'RBC Feedback Dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  env: {
    rbcapi: process.env.RBCAPI,
    perPage: process.env.PER_PAGE,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
  ],
  router: {
    middleware: 'authenticated'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
