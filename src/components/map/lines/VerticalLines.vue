<template>
  <g>
    <line
            v-for="line in centuries"
            class="line"
            :x1="line" :x2="line" :y1="viewBox.y" :y2="viewBox.bottom"
    ></line>
  </g>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'VerticalLines',
    computed: {
      ...mapGetters('view', ['viewBox','centuries'])
    }
  }
</script>

<style scoped>
  .line {
    stroke: var(--grid-color);
    stroke-width: var(--grid-width);
    transition: stroke var(--transition-speed);
  }
</style>