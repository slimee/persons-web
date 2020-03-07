
export const dayFromDate = date => date.getTime() / (1000 * 60 * 60 * 24)
export const dateFromDay = day => new Date(day * (1000 * 60 * 60 * 24))
export const pixelFromDay = day => day / 150
export const dayFromPixel = pixel => pixel * 150
export const pixelFromDate = date => pixelFromDay(dayFromDate(date))
export const dateFromPixel = pixel => dateFromDay(dayFromPixel(pixel))
export const yearFromPixel = pixel => dateFromDay(dayFromPixel(pixel)).getFullYear()
export const pixelFromYear = year => pixelFromDate(dateFromYear(year))
export const dateFromYear = year => new Date(year, 0)
export const dayFromYearAvg = year => year * 365
export const toAll = fct => array => {
  array.forEach(fct)
  return array
}
export const tileHeight = 30
export const tileHeightHalf = tileHeight * 0.5
export const tileMargin = 5
export const tileGap = 7
export const tileHeightPlusGap = tileHeight + tileGap
export const outsideAtWidth = 150
export const arrowSize = tileHeight * 0.5
export const indicationLittleWidth = outsideAtWidth - arrowSize
export const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})


export const floor = (value, width) => Math.floor(value / width) * width
export const ceil = (value, width) => Math.ceil(value / width) * width
export const grid = (from, to, width) => {
  const fromBase = ceil(from, width)
  const toBase = floor(to, width)
  const array = []
  for (let current = fromBase; current <= toBase; current += width) {
    array.push(current)
  }
  return array
}
const personProperties = ['Enfant', 'Influencé par', 'A influencé']
export const isPerson = property => !!personProperties.includes(property.type)
export const largeViewBoxHorizontalMargin = 2000
export const largeViewBoxVerticalMargin = 300
export const indicationRightMargin = 60
export const indicationLeftMargin = 15
export const indicationBottomMargin = 70
export const indicationTopMargin = 30
export const rowFromPixel = pixel => Math.floor(pixel / tileHeightPlusGap)