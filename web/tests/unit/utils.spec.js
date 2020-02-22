import { mergePersonInPersons } from '../../src/services/utils'

describe('util', () => {
  it('mergePersonInPersons', () => {
    const person = { birth: 7 }
    const persons = [
      { birth: 0 },
      { birth: 6 },
      { birth: 8 },
    ]
    const expectedPersons = [
      { birth: 0 },
      { birth: 6 },
      { birth: 7 },
      { birth: 8 },
    ]
    mergePersonInPersons(person, persons)
    expect(persons).toEqual(expectedPersons)
  })
  it('mergePersonInPersons 2', () => {
    const person = { birth: -1 }
    const persons = [
      { birth: 0 },
      { birth: 6 },
      { birth: 8 },
    ]
    const expectedPersons = [
      { birth: -1 },
      { birth: 0 },
      { birth: 6 },
      { birth: 8 },
    ]
    mergePersonInPersons(person, persons)
    expect(persons).toEqual(expectedPersons)
  })
})