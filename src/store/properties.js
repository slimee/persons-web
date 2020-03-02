import properties from '../services/properties'

export default {
  namespaced: true,
  state: {
    term: null,
    results: [],
    pageSize: 60,
    currentPage: null,
  },
  mutations: {
    initSearch(state, term) {
      state.term = term
      state.currentPage = -1
      state.results = []
    },
    setResults(state, results) {
      state.results = results
    },
    appendResults(state, results) {
      state.results.push(...results)
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
  },
  actions: {
    clear({ commit }) {
      commit('initSearch')
    },
    async search({ commit, state, dispatch }, term) {
      commit('initSearch', term)
      if (term && term.length >= 2) {
        await dispatch('nextPage')
      }
    },
    async nextPage({ commit, state }) {
      commit('setCurrentPage', state.currentPage + 1)

      const filter = {
        n: state.term,
        ps: state.pageSize,
        pn: state.currentPage,
      }
      const results = await properties.find(filter)

      commit('setResults', results)
    },
  },
  getters: {},
}