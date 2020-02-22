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
    setAll: ({ commit }, persons) => commit('setAll', persons),
    addAll: ({ commit }, persons) => commit('addAll', persons),
    showPerson: async ({ state, commit, getters }, index) => {
      commit('setDisplayedPersonIndex', index)
      commit('setDisplayedPerson', state.all[index])
      commit('setDisplayedDetailledPerson', await persons.get(state.displayedPerson._id))
    },
    hidePerson: ({ commit }) => commit('hidePerson'),
  },
}