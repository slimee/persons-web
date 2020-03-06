import { dayFromDate, dayFromYearAvg, pixelFromDate, pixelFromDay, toAll } from './utils'
import { paramsOf } from './api'

const api = require('./api')

const find = filter => api
  .get(`/api/persons${paramsOf(filter)}`)
  .then(deserializeAll)

const count = filter => api
  .get(`/api/persons/count${paramsOf(filter)}`)
  .then(({ count }) => count)

const get = _id => api
  .get(`/api/persons/${_id}`)
  .then(deserialize)

const deserialize = (person) => {
  person.birth = new Date(person.birth)
  person.birthYear = person.birth.getFullYear()
  person.death = person.death && new Date(person.death)
  person.deathYear = person.death && person.death.getFullYear()
  if (person.death) {
    person.age = dayFromDate(person.death) - dayFromDate(person.birth)
  } else {
    const aliveAge = dayFromDate(new Date()) - dayFromDate(person.birth)
    if (aliveAge < dayFromYearAvg(130)) {
      person.age = aliveAge
    } else {
      person.age = dayFromYearAvg(80)
      person.unknownDeath = true
    }
  }
  person.unknownBirth = person.age < 0
  if (person.unknownBirth) {
    person.unknownDeath = true
  }
  person.birthPixel = pixelFromDate(person.birth)
  person.widthPixel = pixelFromDay(person.age > 0 ? person.age : dayFromYearAvg(100))
  person.deathPixel = person.birthPixel + person.widthPixel
  return person
}

const deserializeAll = toAll(deserialize)

export default { count, find, get }