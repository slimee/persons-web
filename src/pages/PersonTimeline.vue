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
    },
    computed: {
      ...mapState('route', ['query']),
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