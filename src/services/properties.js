import { paramsOf } from './api'

const api = require('./api')

const find = params => api
  .get(`/api/properties${paramsOf(params)}`)

const get = _id => api
  .get(`/api/properties/${_id}`)

export default {find, get}

export const logos = {
  'Formation': '🎓',
  'Influencé par': '⏪',
  'A influencé': '⏩',
  'Enfant': '👶',
  'Œuvres principales': '📚',
  'Principaux intérêts': '❤️',
  'Nationalité': '🏳️‍🌈',
  'Distinction': '🥇',
  'Activité': '👷',
  'Profession': '👷',
  'Domaine': '🏫',
  'Idées remarquables': '💡',
  'École/tradition': '👕',
  'Renommé pour': '🏆',
}

export const getLogo = value => logos[value] || ''