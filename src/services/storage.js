export const makeGetSet = key => ({
  get: () => localStorage.getItem(key),
  set: () => localStorage.setItem(key, value),
})

export const theme = makeGetSet('theme')