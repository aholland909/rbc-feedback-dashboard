
// Checks if user is logged in

export default {
	async mounted() {
		if (!this.$store.state.user) {
			this.$router.push('/login');
		}
	}
}