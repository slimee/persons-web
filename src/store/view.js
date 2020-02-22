import TWEEN from '@tweenjs/tween.js'

import {
  grid,
  largeViewBoxHorizontalMargin,
  largeViewBoxVerticalMargin,
  pixelFromDate,
  pixelFromDay,
  pixelFromYear,
  rowFromPixel,
  tileHeightPlusGap,
  yearFromPixel,
} from '../services/utils'

const nowPixel = pixelFromDate(new Date())

export default {
  namespaced: true,
  state: {
    camera: {
      zoom: 1,
      panx: pixelFromDate(new Date()),
      pany: null,
    },
    maxX: nowPixel,
    window: {
      width: null,
      height: null,
    },
  },
  mutations: {
    lookAt: (state, point) => {
      state.camera.panx = point.x
      state.camera.pany = point.y
    },
    resizeWindow: (state, { innerWidth, innerHeight }) => {
      state.window.width = innerWidth
      state.window.height = innerHeight
    },
  },
  actions: {
    lookAt: ({ state, commit, dispatch }, { x = state.camera.panx, y = state.camera.pany, direct = false }) => {
      x = Math.min(x, state.maxX)
      const current = { x: state.camera.panx, y: state.camera.pany }
      const dest = { x, y }
      const duration = Math.min(1000, Math.max(150, Math.abs(dest.x - current.x)))
      if (direct || state.camera.panx === null && state.camera.pany === null) {
        commit('lookAt', dest)
      } else {
        new TWEEN.Tween(current)
          .to(dest, duration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => commit('lookAt', current))
          .onComplete(() => dispatch('lookAtNearestValid'))
          .start()
      }
    },
    lookAtNearestValid({ dispatch, getters }) {
      let x, y
      if (getters.tileViewBox.x > getters.viewBox.centerX)
        x = getters.tileViewBox.x
      else if (getters.tileViewBox.right < getters.viewBox.centerX)
        x = getters.tileViewBox.right

      if (getters.tileViewBox.y > getters.viewBox.centerY)
        y = getters.tileViewBox.y
      else if (getters.tileViewBox.bottom < getters.viewBox.centerY)
        y = getters.tileViewBox.bottom

      if (x !== undefined || y !== undefined) {
        dispatch('lookAt', { x, y })
      }
    },
    lookAtIndex: ({ getters, dispatch, rootState }, index) => {
      if (index !== null && index !== undefined) {
        dispatch('lookAtPerson', {
          person: getters.visiblePersons[index],
          row: index,
        })
      }
    },
    lookAtPerson: ({ dispatch, getters }, { person, row }) => {
      dispatch('lookAt', {
        x: pixelFromDate(person.birth) + Math.min(getters.viewBox.width * 0.5 - 15, pixelFromDay(0.5 * person.age)),
        y: getters.tileY(row),
      })
    },
    lookAtOffset: ({ dispatch, state }, { x, y }) =>
      dispatch('lookAt', {
        x: state.camera.panx - x,
        y: state.camera.pany - y,
        direct: true,
      }),
    resizeWindow: ({ commit }, window) => commit('resizeWindow', window),
  },
  getters: {
    tileViewBox: (state, getters, rootState) => {
      const persons = rootState.persons.all
      if (persons.length === 0) {
        return { x: nowPixel, y: 0, right: nowPixel, bottom: 0, width: 0, height: 0 }
      }
      const firstPerson = persons[0]
      const lastPerson = persons[persons.length - 1]
      return {
        x: firstPerson.birthPixel,
        y: 0,
        right: lastPerson.birthPixel,
        bottom: persons.length * tileHeightPlusGap,
        width: lastPerson.birthPixel - firstPerson.birthPixel,
        height: persons.length * tileHeightPlusGap,
      }
    },
    viewBox: s => {
      const width = s.camera.zoom * s.window.width
      const height = s.camera.zoom * s.window.height
      const x = s.camera.panx - 0.5 * width
      const left = x
      const y = s.camera.pany - 0.5 * height
      const top = y
      const centerX = s.camera.panx
      const centerY = s.camera.pany
      const right = x + width
      const bottom = y + height
      const firstThirdX = x + (width * 0.33334)
      const secondThirdX = x + (width * 0.66667)
      return {
        left, top, x, y, centerX, centerY, width, height, right, bottom, firstThirdX, secondThirdX,
      }
    },
    viewBoxStr: (state, getters) => {
      const viewBox = getters.viewBox
      return `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
    },
    largeViewBox: (state, getters) => {
      const viewBox = getters.viewBox
      const lvb = {
        x: viewBox.x - largeViewBoxHorizontalMargin,
        y: viewBox.y - largeViewBoxVerticalMargin,
        width: viewBox.width + 2 * largeViewBoxHorizontalMargin,
        height: viewBox.height + 2 * largeViewBoxVerticalMargin,
      }
      lvb.right = lvb.x + lvb.width
      lvb.bottom = lvb.y + lvb.height
      return lvb
    },
    visiblePersons: (state, getters, rootState) => {
      const persons = rootState.persons.all
      const rowBox = getters.rowBox
      return persons && persons.slice(rowBox.begin, rowBox.end)
    },
    rowBox: (state, getters) => {
      const viewBox = getters.viewBox
      const first = rowFromPixel(viewBox.y)
      const begin = Math.max(0, first)
      const maxLength = 2 + rowFromPixel(viewBox.height)
      const length = Math.max(0, maxLength + Math.min(0, first))
      const end = begin + length
      return {
        begin, end,
      }
    },
    tileY: (state, getters) => row => (getters.rowBox.begin + row) * tileHeightPlusGap,
    centuries: (state, getters) => grid(
      yearFromPixel(getters.viewBox.x),
      yearFromPixel(getters.viewBox.right),
      100,
    ).map(pixelFromYear),
    nextPagePoint(state, getters, rootState) {
      const persons = rootState.persons.all
      if (persons.length > 0) {
        return {
          x: persons[persons.length - 1].birthPixel,
          y: persons.length * tileHeightPlusGap,
        }
      }
    },
    nextPageVisible(state, getters) {
      if (getters.nextPagePoint && getters.largeViewBox) {
        if (getters.nextPagePoint.x < getters.largeViewBox.right) {
          if (getters.nextPagePoint.y < getters.largeViewBox.bottom) {
            return true
          }
        }
      }
    },
  },
}