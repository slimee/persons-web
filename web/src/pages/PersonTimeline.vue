<template>
  <div class="person-timeline full-height">
    <tiles-map/>
    <person-panel/>
    <dark-mode-toggle/>
    <search-overview/>
  </div>
</template>

<script>

  import FilterPanel from '../components/panel/FilterPanel'
  import PersonPanel from '../components/panel/PersonPanel'
  import TilesMap from '../components/map/TilesMap'
  import SearchOverview from '../components/bars/SearchOverview'
  import { mapActions, mapState } from 'vuex'
  import DarkModeToggle from '../components/bars/DarkModeToggle'

  export default {
    name: 'PersonTimeline',
    components: { DarkModeToggle, SearchOverview, TilesMap, PersonPanel, FilterPanel },
    methods: {
      ...mapActions('search', ['loadNextPage']),
      ...mapActions('view', ['resizeWindow']),
      trackWindowSize() {
        this.resizeWindow(window)
        window.addEventListener('resize', () => this.resizeWindow(window))
      },
    },
    computed: {
      ...mapState('route', ['query']),
    },
    mounted() {
      this.trackWindowSize()
      this.loadNextPage()
    },
    watch: {
      query() {
        this.loadNextPage()
      },
    },
  }
</script>


<style scoped>

</style>