<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-field>
            <b-checkbox v-model="feedback.processed"></b-checkbox>
          </b-field>
        </p>

        <p class="card-header-title has-text-grey">
          {{ feedback.issue }}
        </p>
        <p class="card-header-icon">
          {{ feedback.feedback }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          {{ feedback.description }}
        </div>
        <div class="content">
          <b-field>
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
          {{ new Date(feedback.updated).toLocaleString() }}
        </div>
      </div>
      <footer class="card-footer">
        <div style="padding: 6px 16px">
          <b-button class="is-primary" @click="editFeedback()">{{
            this.edited ? 'Save' : 'Edit'
          }}</b-button>
          <b-button class="is-danger" @click="deleteFeedback()"
            >Delete</b-button
          >
          <b-button
            icon-right="arrow-right-circle-outline"
            tag="router-link"
            :to="`feedback/${this.feedback.ticket_id}`"
          ></b-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: this.$store.state.user,
      edited: false,
    }
  },
  props: {
    feedback: {
      type: Object,
      required: true,
    },
  },
  watch: {
    feedback: {
      handler(newVal, oldVal) {
        this.edited = true
      },
      deep: true,
    },
  },
  methods: {
    editFeedback() {
      axios
        .put(
          process.env.rbcapi + `api/feedback/${this.feedback.ticket_id}`,
          {
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
    },
    deleteFeedback() {
      console.log('Delete feedback')
    },
  },
}
</script>
