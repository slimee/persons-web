import { version } from '../../package.json'

export default {
  namespaced: true,
  state: {
    version,
  },
  mutations: {},
  actions: {
    async mount({ dispatch }) {
      await dispatch('layout/darkFromStorage', null, { root: true })
      await dispatch('tween/init', null, { root: true })
    },
  },
  getters: {},
}