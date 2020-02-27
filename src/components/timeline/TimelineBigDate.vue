<template>
  <g>
    <defs>
      <linearGradient id="myGradient">
        <stop offset="0%" class="stop-color" stop-opacity="0"></stop>
        <stop offset="30%" class="stop-color"></stop>
        <stop offset="70%" class="stop-color"></stop>
        <stop offset="100%" class="stop-color" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
    <rect :x="effectiveX-width" :y="y" :width="width*2" :height="height" class="backgroundRect"></rect>

    <text class="timelineBigText" :x="effectiveX" :y="y+height*0.5">{{formattedDate}}</text>

  </g>
</template>

<script>
  import { dateFromPixel, pixelFromDate } from '../../services/utils'

  export default {
    name: 'TimelineBigDate',
    props: {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
      maxDate: Date,
    },
    computed: {
      effectiveX: function () {
        if (this.maxDate === undefined) return this.x
        if (this.maxDate < dateFromPixel(this.x)) return pixelFromDate(this.maxDate)
        return this.x
      },
      date: function () {
        return dateFromPixel(this.effectiveX)
      },
      formattedDate: function () {
        return this.date.getFullYear()
      },
    },
  }
</script>

<style scoped>
  .backgroundRect {
    fill: url('#myGradient');
  }

  .timelineBigText {
    fill: var(--timeline-bigdate-font-color);
    alignment-baseline: central;
    text-anchor: middle;
    font-weight: var(--timeline-bigdate-font-weight);
    font-size: var(--timeline-bigdate-font-size);
  }

  .stop-color {
    stop-color: var(--timeline-bigdate-stop-color);
    transition: stop-color var(--transition-speed);
  }
</style>