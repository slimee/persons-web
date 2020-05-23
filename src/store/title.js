export default {
  namespaced: true,
  actions: {
    clear() {
      document.title = 'Timeline'
    },
    set({}, name) {
      document.title = `Timeline: ${name}`
    },
  },
}
