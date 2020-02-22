<template>
  <g :transform="transform">
    <rect
            @click="click"
            class="tileRect hoverable"
            :x="x" :width="width" :height="tileHeight"
    ></rect>
    <text class="tileText"
          :x="x+tileMargin" y="15"
    >
      {{person.name}}
    </text>

    <text v-if="warningBirth" class="warningText"
          :x="x-5" y="15"
    >
      {{warningBirth}}
    </text>

    <text v-if="warningDeath" class="warningText"
          :x="x+width-5" y="15"
    >
      {{warningDeath}}
    </text>

  </g>
</template>


<script>
  import {
    dateFromDay,
    dayFromPixel,
    dayFromYearAvg,
    pixelFromDay,
    tileHeight,
    tileMargin,
  } from '../../services/utils'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'PersonTile',
    props: {
      person: Object,
      row: Number,
    },
    data: () => ({
      tileMargin,
      tileHeight,
    }),
    computed: {
      ...mapGetters('view', ['tileY', 'rowBox']),
      transform: function () {
        return `translate(0,${this.y})`
      },
      x: function () {
        return this.person.birthPixel
      },
      y: function () {
        return this.tileY(this.row)
      },
      width: function () {
        return pixelFromDay(
          this.person.age > 0 ? this.person.age : dayFromYearAvg(100),
        )
      },
      warningDeath: function () {
        return this.person.unknownDeath && '❓'
      },
      warningBirth: function () {
        return this.person.unknownBirth && '❓'
      },
    },
    methods: {
      ...mapActions('persons', ['showPerson']),
      dayToDate: dateFromDay,
      pixelToDay: dayFromPixel,
      click() {
        this.showPerson(this.rowBox.begin + this.row)
      },
    },
  }
</script>

<style>
  .tileRect {
    fill: var(--tile-color);
    stroke: var(--tile-border-color);
    stroke-width: var(--tile-border-width);

    cursor: pointer;
    rx: var(--tile-radius);
    ry: var(--tile-radius);

    transition: fill var(--transition-speed), stroke var(--transition-speed);
  }

  .tileText {
    alignment-baseline: middle;
    pointer-events: none;
  }

  .warningText {
    alignment-baseline: middle;
    pointer-events: none;
    font-size: x-small;
  }
</style>