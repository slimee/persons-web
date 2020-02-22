import TWEEN from '@tweenjs/tween.js'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    init() {
      function animate(time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }

      requestAnimationFrame(animate)
    },
  },
  getters: {},
}