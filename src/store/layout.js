export default {
  namespaced: true,
  state: {
    dark: false,
  },
  mutations: {
    setDark(state, dark) {
      state.dark = !!dark
    },
  },
  actions: {
    setDark({ commit, dispatch }, dark) {
      commit('setDark', dark)
      dispatch('darkToStorage', dark)
    },
    darkFromStorage({ commit }) {
      const dark = localStorage.getItem('dark') === 'true'
      commit('setDark', dark)
    },
    darkToStorage({ state }) {
      localStorage.setItem('dark', `${state.dark}`)
    },
  },
  getters: {},
}