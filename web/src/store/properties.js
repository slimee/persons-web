import properties from '../services/properties'

export default {
  namespaced: true,
  state: {
    all: [],
    term: null,
    results: [],
    pageSize: 12,
    currentPage: null,
  },
  mutations: {
    init(state, properties) {
      state.all = properties
    },
    initSearch(state, term) {
      state.term = term
      state.currentPage = -1
      state.results = []
    },
    appendResults(state, results) {
      state.results.push(...results)
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
  },
  actions: {
    async init({ commit }) {
      commit('init', await properties.find())
    },
    clear({ commit }) {
      commit('initSearch')
    },
    search({ commit, state, dispatch }, term) {
      commit('initSearch', term)
      if (term && term.length >= 2) {
        dispatch('nextPage')
      }
    },
    nextPage({ commit, state }) {
      commit('setCurrentPage', state.currentPage + 1)
      const results = state.all
        .filter(prop => prop.title.indexOf(state.term) !== -1)
        .slice(state.currentPage * state.pageSize, state.pageSize)
      commit('appendResults', results)
    },
  },
  getters: {},
}