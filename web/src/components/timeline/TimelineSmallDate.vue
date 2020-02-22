<template>
  <text class="timelineSmallText" :x="x" :y="y">{{formattedDate}}</text>
</template>

<script>
  import { pixelFromDate } from '../../services/utils'

  export default {
    name: 'TimelineSmallDate',
    props: {
      viewBox: Object,
      y: Number,
      date: Date,
    },
    computed: {
      x: function () {
        return pixelFromDate(this.date)
      },
      formattedDate: function () {
        return this.date.getFullYear()
      },
    },
  }
</script>

<style scoped>
  .timelineSmallText {
    alignment-baseline: central;
    text-anchor: middle;
  }
</style>
