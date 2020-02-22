<template>
  <g>
    <defs>
      <pattern id="pattern" x="0" y="0" :width="200*scale" :height="200*scale" patternUnits="userSpaceOnUse">
        <rect class="grid-future-back" :width='200*scale' :height='200*scale'/>
        <defs>
          <linearGradient id='a' gradientUnits='userSpaceOnUse' :x1='100*scale' :y1='33*scale' :x2='100*scale'
                          :y2='-3*scale'>
            <stop offset='0' stop-color='#000' stop-opacity='0'/>
            <stop offset='1' stop-color='#000' stop-opacity='1'/>
          </linearGradient>
          <linearGradient id='b' gradientUnits='userSpaceOnUse' :x1='100*scale' :y1='135*scale' :x2='100*scale'
                          :y2='97*scale'>
            <stop offset='0' stop-color='#000' stop-opacity='0'/>
            <stop offset='1' stop-color='#000' stop-opacity='1'/>
          </linearGradient>
        </defs>
        <g class="grid-future-back2" fill-opacity='0.4'>
          <rect :x='100*scale' :width='100*scale' :height='100*scale'/>
          <rect :y='100*scale' :width='100*scale' :height='100*scale'/>
        </g>
        <g fill-opacity='0.4'>
          <polygon fill='url(#a)' :points='scaledPoints1'/>
          <polygon fill='url(#b)' :points='scaledPoints2'/>
        </g>
      </pattern>
    </defs>
    <filter id="dropshadow" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10"/> <!-- stdDeviation is how much to blur -->
      <feOffset dx="-10" dy="2" result="offsetblur"/> <!-- how much to offset -->
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5"/> <!-- slope is the opacity of the shadow -->
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/> <!-- this contains the offset blurred image -->
        <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
      </feMerge>
    </filter>
    <rect
            class="grid-future-rect"
            :x="nowX" :y="viewBox.y" :width="viewBox.width" :height="viewBox.height"
    ></rect>
    <line
            class="grid-present-line"
            :x1="nowX" :x2="nowX" :y1="viewBox.y" :y2="viewBox.bottom"
    ></line>
  </g>
</template>

<script>
  import { pixelFromDate } from '../../../services/utils'
  import { mapGetters } from 'vuex'

  export default {
    name: 'PresentFutureLines',
    data: () => ({
      nowX: pixelFromDate(new Date()) + 1,
      scale: 0.3,
    }),
    computed: {
      ...mapGetters('view', ['viewBox']),
      scaledPoints1() {
        return [100, 30, 0, 0, 200, 0].map(p => p * this.scale).join(' ')
      },
      scaledPoints2() {
        return [100, 100, 0, 130, 0, 100, 200, 100, 200, 130].map(p => p * this.scale).join(' ')
      },
    },
  }
</script>

<style scoped>
  .grid-present-line {
    stroke: var(--grid-present-line-color);
    stroke-width: var(--grid-present-line-width);
    stroke-dasharray: var(--grid-present-dash-array);
  }

  .grid-future-back {
    fill: var(--future-color);
    transition: fill var(--transition-speed);
  }

  .grid-future-back2 {
    fill: var(--future-color2);
    transition: fill var(--transition-speed);
  }

  .grid-future-rect {
    /*fill: var(--grid-future-rect-color);*/
    /*opacity: var(--grid-future-rect-opacity);*/
    filter: url(#dropshadow);
    fill: url(#pattern)
  }
</style>