<template>
  <g :transform="transform" class="indicate-right">
    <path
            @click="click"
            class="tileRect"
            :d="shape"
    ></path>
    <g class="tileTextG">
      <text class="tileText"
            :x="textOffsetX" :y="textOffsetY"
            :transform="textTransform"
      >
        {{label}}
      </text>
    </g>
  </g>
</template>


<script>
  import {
    arrowSize,
    dateFromDay,
    dayFromPixel,
    indicationLittleWidth,
    outsideAtWidth,
    tileHeight,
  } from '../../services/utils'

  export default {
    name: 'IndicateTile',
    props: {
      text: { type: String, required: true },
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      angle: { type: Number, default: 0 },
    },
    data: () => ({
      textOffsetX: -arrowSize - 0.5 * indicationLittleWidth,
      textOffsetY: -tileHeight * 0.5 + 15,
      tileHeightHalf: tileHeight * 0.35,
    }),
    computed: {
      textTransform() {
        if (this.angle > 90 && this.angle < 270) {
          return `rotate(${180}, ${this.textOffsetX} ${this.textOffsetY})`
        }
      },
      transform: function () {
        return `translate(${this.x},${this.y}) rotate(${this.angle})`
      },
      label: function () {
        const maxLength = outsideAtWidth / 8
        if (this.text.length > maxLength) {
          return `${this.text.substr(0, maxLength - 2)}...`
        } else {
          return this.text
        }
      },
      shape: function () {
        return `M ${-outsideAtWidth} ${-this.tileHeightHalf} h ${indicationLittleWidth} l ${arrowSize} ${this.tileHeightHalf} l ${-arrowSize} ${this.tileHeightHalf} h ${-indicationLittleWidth} Z`
      },
    },
    methods: {
      dayToDate: dateFromDay,
      pixelToDay: dayFromPixel,
      click() {
        this.$emit('click')
      },
    },
  }
</script>

<style scoped>
  .tileRect {
    fill: var(--outside-color);
    stroke: var(--outside-border-color);
    stroke-width: var(--outside-border-width);
    cursor: pointer;
    transition: all 200ms;
  }

  .tileText {
    alignment-baseline: central;
    text-anchor: middle;
    pointer-events: none;
  }

  .tileTextG {
    transform: translate(0, 0);
    transition: transform 200ms;
  }

  .tileRect:hover + .tileTextG {
    transform: translate(-30px, 0);
  }

  .tileRect:hover {
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
  }
</style>