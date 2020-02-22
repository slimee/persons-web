<template>
  <g>
    <indicate-tile v-if="outsideRight"
                   :x="outsideRight.x"
                   :y="outsideRight.y"
                   :text="outsideRight.text"
                   @click="lookAtIndex(outsideRight.index)"
    ></indicate-tile>
    <indicate-tile v-if="outsideLeft"
                   :x="outsideLeft.x"
                   :y="outsideLeft.y"
                   :angle="outsideLeft.angle"
                   :text="outsideLeft.text"
                   @click="lookAtIndex(outsideLeft.index)"
    ></indicate-tile>
  </g>
</template>

<script>
  import {
    indicationLeftMargin,
    indicationRightMargin,
    tileGap,
    tileHeight,
    tileHeightPlusGap,
    yearFromPixel,
  } from '../../services/utils'
  import IndicateTile from './IndicationTile'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Indications',
    components: { IndicateTile },
    methods: {
      ...mapActions('view', ['lookAtIndex']),
      tileY(row) {
        return (this.rowBox.begin + row) * tileHeightPlusGap + tileHeight * 0.5
      },
      makeOutsideRightPerson(row) {
        const person = this.persons[row]
        return {
          text: person.name,
          index: row,
          x: Math.min(this.viewBox.right, person.birthPixel) - tileGap,
          y: this.tileY(row),
        }
      },
      makeOutsideLeftPerson(row) {
        const person = this.persons[row]
        return {
          text: person.name,
          index: row,
          x: this.viewBox.x,
          y: this.tileY(row),
          angle: 180,
        }
      },
    },
    computed: {
      ...mapGetters('view', { viewBox: 'viewBox', persons: 'visiblePersons', rowBox: 'rowBox' }),
      hasPersons() {
        return this.persons && this.persons.length > 0
      },
      lastPersonIndex: function () {
        return this.hasPersons && this.persons.length - 1
      },
      outsideRight: function () {
        if (this.hasPersons) {
          return this.allAreOutsideRight || this.outsideRightPersons
        }
      },
      outsideLeft: function () {
        if (this.hasPersons) {
          return this.allAreOutsideLeft || this.outsideLeftPersons
        }
      },
      allAreOutsideLeft: function () {
        const viewBoxLeftYear = yearFromPixel(this.viewBox.left - indicationLeftMargin)
        return this.persons[this.lastPersonIndex].birthYear < viewBoxLeftYear
          && this.makeOutsideRightPerson(this.lastPersonIndex)
      },
      outsideLeftPersons: function () {
        const viewBoxLeftYear = yearFromPixel(this.viewBox.left - indicationLeftMargin)
        const firstThirdX = yearFromPixel(this.viewBox.firstThirdX)
        for (let i = this.lastPersonIndex; i >= 0; i--) {
          if (this.persons[i].birthYear < viewBoxLeftYear) {
            if (this.persons[i + 1].birthYear > firstThirdX) {
              return this.makeOutsideLeftPerson(i)
            }
          }
        }
      },
      allAreOutsideRight: function () {
        const viewBoxRightYear = yearFromPixel(this.viewBox.right - indicationRightMargin)
        return this.persons[0].birthYear > viewBoxRightYear
          && this.makeOutsideRightPerson(0)
      },
      outsideRightPersons: function () {
        const viewBoxRightYear = yearFromPixel(this.viewBox.right - indicationRightMargin)
        const secondThirdX = yearFromPixel(this.viewBox.secondThirdX)
        for (let i = 0; i <= this.lastPersonIndex; i++) {
          if (viewBoxRightYear < this.persons[i].birthYear) {
            if (this.persons[i - 1].birthYear < secondThirdX) {
              return this.makeOutsideRightPerson(i)
            }
          }
        }
      },
    },
  }
</script>

<style scoped>

</style>