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
    indicationBottomMargin,
    indicationLeftMargin,
    indicationRightMargin, indicationTopMargin,
    tileGap,
    tileHeightHalf,
    yearFromPixel,
  } from '../../services/utils'
  import IndicateTile from './IndicationTile'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Indications',
    components: { IndicateTile },
    methods: {
      ...mapActions('view', ['lookAtIndex']),
      makeOutsideRightPerson(row) {
        const person = this.persons[row]
        return {
          text: person.name,
          index: row,
          x: Math.min(this.viewBox.right, person.birthPixel) - tileGap,
          y: this.tileY(row) + tileHeightHalf,
        }
      },
      makeOutsideLeftPerson(row) {
        const person = this.persons[row]
        return {
          text: person.name,
          index: row,
          x: this.viewBox.x + tileGap,
          y: Math.max(Math.min(this.tileY(row) + tileHeightHalf, this.viewBox.bottom - indicationBottomMargin), this.viewBox.top + indicationTopMargin),
          angle: 180,
        }
      },
    },
    computed: {
      ...mapGetters('view', { viewBox: 'viewBox', persons: 'visiblePersons', rowBox: 'rowBox' }),
      ...mapGetters('view', ['tileY']),
      hasPersons() {
        return this.persons && this.persons.length > 0
      },
      lastPersonIndex: function () {
        return this.hasPersons && this.persons.length - 1
      },
      outsideRight: function () {
        return this.hasPersons && this.outsideRightPersons
      },
      outsideLeft: function () {
        return this.hasPersons && this.outsideLeftPersons
      },
      outsideLeftPersons: function () {
        const viewBoxLeftYear = yearFromPixel(this.viewBox.left - indicationLeftMargin)
        for (let i = this.lastPersonIndex; i >= 0; i--) {
          const currentBirthYear = this.persons[i].birthYear
          if (currentBirthYear < viewBoxLeftYear) {
            return this.makeOutsideLeftPerson(i)
          }
        }
      },
      outsideRightPersons: function () {
        const viewBoxRightYear = yearFromPixel(this.viewBox.right - indicationRightMargin)
        for (let i = 0; i <= this.lastPersonIndex; i++) {
          const currentBirthYear = this.persons[i].birthYear
          if (viewBoxRightYear < currentBirthYear) {
            return this.makeOutsideRightPerson(i)
          }
        }
      },
    },
  }
</script>

<style scoped>

</style>