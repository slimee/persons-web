import Vue from 'vue'
import Vuex from 'vuex'
import app from '../store/app'
import persons from '../store/persons'
import view from '../store/view'
import search from '../store/search'
import properties from '../store/properties'
import layout from '../store/layout'
import tween from '../store/tween'
import title from '../store/title'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    persons,
    view,
    search,
    properties,
    layout,
    tween,
    title,
  },
})
