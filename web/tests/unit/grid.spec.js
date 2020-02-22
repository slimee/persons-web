import { ceil, floor, grid } from '../../src/services/utils'

describe('VerticalLines', () => {
  it('make rounds', () => {
    expect(floor(1256, 50)).toEqual(1250)
    expect(ceil(1256, 50)).toEqual(1300)
  })
  it('create a grid numbers', () => {
    const actualGrid = grid(1234, 1456, 50)
    const expectedGrid = [1250, 1300, 1350, 1400, 1450]
    expect(actualGrid).toEqual(expectedGrid)
  })
})