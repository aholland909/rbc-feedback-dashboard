
// Checks if user is logged in

export default function ({ store, redirect }) {
    if (!store.state.user) {
        return redirect('/login')
    }
}