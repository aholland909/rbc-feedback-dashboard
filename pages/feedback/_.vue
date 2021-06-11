<template>
  <section class="section">
    <div class="container">
      <!-- <h1 class="title is-2">Feedback Page</h1> -->
      <h1 class="title is-3">{{ feedback.issue }}</h1>
      <div class="subtitle is-6">{{ feedback.ticket_id }}</div>
      <div class="content">
        <b-field label="Processed">
          <b-checkbox v-model="feedback.processed">{{
            feedback.processed ? 'Yes' : 'No'
          }}</b-checkbox>
        </b-field>
      </div>

      <div class="content">
        <b-field label="Feedback">
          {{ feedback.feedback }}
        </b-field>
      </div>
      <div class="content">
        <b-field label="Description">
          {{ feedback.description }}
        </b-field>
      </div>

      <div class="content">
        <b-field label="Tags">
          <b-taginput
            v-model="feedback.tags"
            ellipsis
            icon="label"
            placeholder="Add a tag"
          >
          </b-taginput>
        </b-field>
      </div>
      <div class="content">
        Created: {{ new Date(feedback.created).toLocaleString() }}
      </div>
      <div class="content">
        Updated: {{ new Date(feedback.updated).toLocaleString() }}
      </div>
      <b-button class="is-primary" @click="editFeedback()">Edit</b-button>
      <b-button class="is-danger" @click="deleteFeedback()">Delete</b-button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'default',

  data() {
    return {
      user: this.$store.state.user,
      feedback: {},
      route: this.$route.path,
      fourofour: false,
    }
  },
  mounted() {
    this.getFeedback()
  },
  methods: {
    getFeedback() {
      const id = this.route.split('/')[2]
      axios
        .get(process.env.rbcapi + `api/feedback/${id}`, {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          },
        })
        .then((response) => {
          this.feedback = response.data
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.popupError('Incorrect username or password')
            this.$router.push({
              path: '/login',
            })
          }
          if (error.response.status == 404) {
            this.fourofour = true
          }

          return error
        })
    },
    editFeedback() {
      axios
        .put(
          process.env.rbcapi + `api/feedback/${this.feedback.ticket_id}`,
          {
            description: this.feedback.description,
            processed: this.feedback.processed,
            tags: this.feedback.tags,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.user.token,
            },
          }
        )
        .then((response) => {
          this.feedback = response.data
          this.$buefy.toast.open('Feedback edited!')
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.popupError('Incorrect username or password')
            this.$router.push({
              path: '/login',
            })
          }

          return error
        })
    },
    deleteFeedback() {
      console.log('Delete feedback')
    },
  },
}
</script>