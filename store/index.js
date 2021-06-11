import Vue from "vue";

export const state = () => ({
    user: null,
    language: "en",
});

export const actions = {
    logoutUser (context) {
      context.commit('logout');
    },
  }

export const mutations = {
    login(state, user) {
        state.user = user;
    },
    logout(state) {
        state.user = null;
    }
};