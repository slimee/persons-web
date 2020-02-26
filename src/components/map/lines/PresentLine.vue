<template>
  <line
          class="present-line"
          :x1="nowX" :x2="nowX" :y1="viewBox.y" :y2="viewBox.bottom"
  ></line>
</template>

<script>
  import { pixelFromDate } from '../../../services/utils'
  import { mapGetters } from 'vuex'

  export default {
    name: 'PresentLine',
    data: () => ({
      nowX: pixelFromDate(new Date()) - 2,
    }),
    computed: {
      ...mapGetters('view', ['viewBox']),
    },
  }
</script>

<style scoped>
  .present-line {
    stroke: var(--grid-present-line-color);
    stroke-width: var(--grid-present-line-width);
    stroke-dasharray: var(--grid-present-dash-array);
  }
</style>