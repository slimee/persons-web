import router from '../plugins/router'
import persons from '../services/persons'
import properties, { getLogo } from '../services/properties'

export default {
  namespaced: true,
  state: {
    currentPage: 0,
    loading: false,
    total: null,
    property: null,
  },
  mutations: {
    incCurrentPage(state) {
      state.currentPage += 1
    },
    initCurrentPage(state) {
      state.currentPage = 0
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setTotal(state, total) {
      state.total = total
    },
    resetTotal(state) {
      state.total = null
    },
    setProperty(state, property) {
      state.property = property
    },
    clearProperty(state) {
      state.property = null
    },
  },
  actions: {
    clearFilter({ dispatch }) {
      dispatch('search', {})
    },
    searchOnProp({ dispatch }, prop) {
      dispatch('persons/hidePerson', null, { root: true })
      dispatch('search', { pid: prop._id })
    },
    search({ commit }, filter) {
      commit('resetTotal')
      commit('initCurrentPage')
      dispatch('persons/hidePerson', null, { root:true }) 
      router
        .push({ name: 'PersonTimeline', query: filter })
        .catch(() => {
        })
    },
    async loadNextPage({ state, commit, getters, dispatch }) {
      if (state.loading) return
      commit('setLoading', true)

      const filter = {
        ...getters.filter,
        ps: 30,
        pn: state.currentPage,
      }

      if (getters.isFirstPage) {
        await dispatch('persons/clearAll', null, { root: true })
        await dispatch('updateProperty')
        await persons.count(getters.filter)
          .then(count => commit('setTotal', count))
        await persons.find(filter)
          .then(persons => {
            dispatch('persons/setAll', persons, { root: true })
            commit('setLoading', false)
          })
      } else {
        await persons.find(filter)
          .then(persons => {
            dispatch('persons/addAll', persons, { root: true })
            commit('setLoading', false)
          })
      }
      commit('incCurrentPage')
    },
    updateProperty({ getters, commit }) {
      commit('clearProperty')
      if (getters.filter.pid) {
        return properties
          .get(getters.filter.pid)
          .then(p => commit('setProperty', p))
      } else if (getters.filter.n) {
        const p = { type: 'Nom', title: getters.filter.n }
        commit('setProperty', p)
      }
    },
  },
  getters: {
    firstLoading(state, getters) {
      return getters.isFirstPage && state.loading
    },
    isFirstPage(state) {
      return state.currentPage === 0
    },
    filter(state, getters, rootState) {
      return rootState.route.query
    },
    isFiltered(state) {
      return state.property && state.total !== null
    },
    filterIcon(state) {
      return getLogo(state.property.type)
    },
    filterLabel(state) {
      return state.property.title
    },
  },
}
