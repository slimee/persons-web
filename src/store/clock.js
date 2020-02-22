const clockChars = [
  '🕐',
  '🕑',
  '🕒',
  '🕓',
  '🕔',
  '🕕',
  '🕖',
  '🕗',
  '🕘',
  '🕙',
  '🕚',
  '🕛',
]

const createClock = (callback, speed = 100) => {
  let index = 0
  let play = true
  const tic = () => {
    callback(clockChars[index])
    index = index === clockChars.length - 1 ? 0 : index + 1
    play && setTimeout(tic, speed)
  }
  tic()
  return () => play = false
}

export default {
  namespaced: true,
  state: {
    currentClock: null,
    stopClock: null,
  },
  mutations: {
    setCurrentClock(state, clock) {
      state.currentClock = clock
    },
    setStopClock(state, stopClock) {
      state.stopClock = stopClock
    },
    clearStopClock(state) {
      state.stopClock = null
    },
  },
  actions: {
    start({ commit }) {
      const setClock = clock => commit('setCurrentClock', clock)
      const stopClock = createClock(setClock)
      commit('setStopClock', stopClock)
    },
    stop({ state, commit }) {
      state.stopClock()
      commit('clearStopClock')
    },
  },
  getters: {},
}