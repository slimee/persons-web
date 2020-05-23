import persons from '../services/persons'

export default {
  namespaced: true,
  state: {
    all: [],
    displayedPersonIndex: null,
    displayedPerson: null,
    displayedDetailledPerson: null,
  },
  mutations: {
    setAll: (state, persons) => state.all = persons,
    addAll: (state, persons) => state.all.push(...persons),
    setDisplayedPersonIndex: (state, index) => state.displayedPersonIndex = index,
    hidePerson: (state) => {
      state.displayedPersonIndex = null
      state.displayedPerson = null
      state.displayedDetailledPerson = null
    },
    setDisplayedPerson: (state, person) => state.displayedPerson = person,
    setDisplayedDetailledPerson: (state, person) => state.displayedDetailledPerson = person,
  },
  actions: {
    clearAll: ({ commit }) => commit('setAll', []),
    setAll: ({ commit }, persons) => commit('setAll', persons),
    addAll: ({ commit }, persons) => commit('addAll', persons),
    showPerson: async ({ state, commit, getters, dispatch }, index) => {
      commit('setDisplayedPersonIndex', index)
      commit('setDisplayedPerson', state.all[index])
      const person = await persons.get(state.displayedPerson._id)
      commit('setDisplayedDetailledPerson', person)
      dispatch('title/set', person.name, { root: true })
    },
    hidePerson: ({ commit, dispatch }) => {
      commit('hidePerson')
      dispatch('title/clear', null, { root: true })
    },
  },
}