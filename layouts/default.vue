<template>
  <div>
    <NavBar />

    <section>
      <!-- <div > -->
        <nuxt />
      <!-- </div> -->
    </section>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'

export default {
  name: "default",
  components: {
    NavBar,
  },
}
</script>
