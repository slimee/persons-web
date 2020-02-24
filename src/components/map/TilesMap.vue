<template>
  <svg id="surface" ref="surface" class="surface no-select" :viewBox="viewBoxStr" style="pointer-events: all"
       v-touch:start="startDrag"
       v-touch:moving="drag"
       v-touch:end="endDrag"
  >

    <VerticalLines/>

    <PersonTile
            v-for="(person, row) in visiblePersons"
            :person="person"
            :row="row"
    />

    <present-future-lines/>

    <indications/>

    <timeline/>

  </svg>
</template>

<script>
  import PersonTile from './PersonTile'
  import Timeline from '../timeline/Timeline'
  import IndicateTile from './IndicationTile'
  import VerticalLines from './lines/VerticalLines'
  import PresentFutureLines from './lines/PresentFutureLines'
  import Indications from './Indications'
  import { mapActions, mapGetters, mapState } from 'vuex'

  const minus = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y })
  const add = (p1, p2) => ({ x: p1.x + p2.x, y: p1.y + p2.y })
  const getPoint = e => e.touches
    ? { x: e.touches[0].screenX, y: e.touches[0].screenY }
    : { x: e.screenX, y: e.screenY }

  export default {
    name: 'TilesMap',
    components: { Indications, PresentFutureLines, VerticalLines, IndicateTile, Timeline, PersonTile },
    data: () => ({
      downPoint: null,
      cameraPan: null,
    }),
    methods: {
      ...mapActions('view', ['lookAt', 'lookAtNearestValid']),
      ...mapActions('search', ['loadNextPage']),
      startDrag(e) {
        this.cameraPan = { x: this.camera.panx, y: this.camera.pany }
        this.downPoint = getPoint(e)
      },
      drag(e) {
        if (this.downPoint) {
          const dragPoint = getPoint(e)
          const deltaPoint = minus(this.downPoint, dragPoint)
          const point = add(this.cameraPan, deltaPoint)
          this.lookAt({ ...point, direct: true })
        }
      },
      endDrag() {
        this.downPoint = null
        this.lookAtNearestValid()
      },
    },
    computed: {
      ...mapGetters('view', ['viewBoxStr', 'visiblePersons', 'nextPageVisible']),
      ...mapState('view', ['camera']),
    },
    watch: {
      nextPageVisible(value) {
        value && this.loadNextPage()
      },
    },
  }
</script>

<style scoped>
  .surface {
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
</style>