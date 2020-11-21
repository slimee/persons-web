import { version } from '../../package.json'

export default {
  namespaced: true,
  state: {
    version,
  },
  mutations: {},
  actions: {
    async startApp({ dispatch }) {
      await dispatch('layout/darkFromStorage', null, { root: true })
      await dispatch('tween/init', null, { root: true })
      await dispatch('title/clear', null, { root: true })
      await dispatch('view/listenWindowResize', null, { root: true })
    },
  },
  getters: {},
}