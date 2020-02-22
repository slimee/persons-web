<template>
  <svg id="surface" ref="surface" class="surface" :viewBox="viewBoxStr" style="pointer-events: all">

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
  import Hammer from 'hammerjs'
  import startPan from '../../services/startPan'
  import PersonTile from './PersonTile'
  import Timeline from '../timeline/Timeline'
  import IndicateTile from './IndicationTile'
  import VerticalLines from './lines/VerticalLines'
  import PresentFutureLines from './lines/PresentFutureLines'
  import Indications from './Indications'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'TilesMap',
    components: { Indications, PresentFutureLines, VerticalLines, IndicateTile, Timeline, PersonTile },
    data: () => ({
      touch: null,
      domRef: null,
    }),
    methods: {
      ...mapActions('view', ['lookAtOffset', 'lookAtNearestValid']),
      ...mapActions('search', ['loadNextPage']),
      onPanEnd() {
        this.lookAtNearestValid()
      },
      svgDown: function (evt) {
        startPan({
          evt,
          applyCameraOffset: this.lookAtOffset,
          domRef: this.domRef,
          pen: this.pen,
          touch: this.touch,
          onEnd: this.onPanEnd,
        })
      },
      initDomRef() {
        this.domRef = {
          svg: document.getElementById('surface'),
          svgPoint: document.getElementById('surface').createSVGPoint(),
        }
      },
      initTouch() {
        this.touch = new Hammer(this.domRef.svg)
        this.touch.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }))
        this.touch.add(new Hammer.Press({ time: 0 }))
        this.touch.on('press', this.svgDown)
      },
    },
    computed: {
      ...mapGetters('view', ['viewBoxStr', 'visiblePersons', 'nextPageVisible']),
    },
    mounted: function () {
      this.initDomRef()
      this.initTouch()
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