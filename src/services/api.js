import Vue from 'vue'
import VueRessource from 'vue-resource'

Vue.use(VueRessource)

Vue.http.options.root = location.origin

const encode = value => value instanceof Date ? encodeURIComponent(value.toISOString()) : encodeURIComponent(value)
const isNil = v => v === null || v === undefined

/**
 *
 * @param param => '_ids'
 * @param values => [1,2,3]
 * @returns "_ids=1&_ids=2&_ids=3"
 */
const arrayOf = (param, values) => {
  const arr = []
  for (let i = 0; i < values.length; i++) {
    arr.push(`${param}=${encode(values[i])}`)
  }
  return arr.join('&')
}

export const paramsOf = params => {
  if (!params) return ''
  const keys = Object.keys(params)
  const arr = []
  for (let i = 0; i < keys.length; i++) {
    const rawValue = params[keys[i]]
    if (!isNil(rawValue)) {
      arr.push(Array.isArray(rawValue) ? arrayOf(keys[i], rawValue) : `${keys[i]}=${encode(rawValue)}`)
    }
  }
  return arr.length > 0 ? '?' + arr.join('&') : ''
}

export const get = url => Vue.http.get(url, { json: true }).then(resp => resp.body)
export const del = url => Vue.http.delete(url, { json: true })
export const post = (url, body) => Vue.http.post(url, body, { json: true })
export const put = (url, body) => Vue.http.put(url, body, { json: true })