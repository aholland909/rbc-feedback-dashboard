<template>
  <section class="container">
    <div class="columns">
      <div class="column">
        <div v-for="f in feedback.results" :key="f.id">
          <FeedbackCard :feedback="f" />
        </div>
        <div class="column">
          <b-pagination
            :total="total"
            v-model="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            @change="getFeedback()"
          >
          </b-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import FeedbackCard from '~/components/FeedbackCard.vue'

export default {
  name: 'HomePage',
  data() {
    return {
      user: this.$store.state.user,
      feedback: [],
      total: 0,
      current: 1,
      perPage: process.env.perPage,
      sort: 'asc',
      rangeBefore: 3,
      rangeAfter: 1,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
    }
  },
  components: {
    FeedbackCard,
  },
  mounted() {
    console.log('Welcome to feedback')
    this.checkUser();
    this.getFeedback()
  },
  methods: {
    getFeedback() {
      if (this.user) {
        axios
          .get(
            process.env.rbcapi +
              `api/feedback/page/${this.current}?length=${this.perPage}&sort=${this.sort}`,
            {
              headers: {
                Authorization: 'Bearer ' + this.user.token,
              },
            }
          )
          .then((response) => {
            this.feedback = response.data
            this.current = response.data.page
            this.total = response.data.total_results
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.popupError('Incorrect username or password')
            }
            this.$router.push({
              path: '/login',
            })
            return error
          })
      }
    },
    checkUser() {
      //check store for user
      if (!this.user) {
        this.$router.push({
          path: '/login',
        })
        return
      }
    },
  },
}
</script>
