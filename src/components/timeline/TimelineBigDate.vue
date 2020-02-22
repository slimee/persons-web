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
    <rect :x="x-width" :y="y" :width="width*2" :height="height" class="backgroundRect"></rect>

    <text class="timelineBigText" :x="x" :y="y+height*0.5">{{formattedDate}}</text>

  </g>
</template>

<script>
  import { dateFromPixel } from '../../services/utils'

  export default {
    name: 'TimelineBigDate',
    props: {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
    },
    computed: {
      date: function () {
        return dateFromPixel(this.x)
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