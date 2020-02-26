<template>
  <g class="timeline" @click="timelineClick">
    <rect class="ruban-back"
          :x="ruban.x" :width="ruban.width"
          :y="ruban.y" :height="ruban.height"
    ></rect>

    <template v-for="century in centuries">
      <timeline-small-date :view-box="viewBox" :date="dateFromPixel(century)" :y="ruban.y + ruban.height * 0.5"/>
    </template>

    <timeline-big-date
            :x="viewBox.x+bigDateWidth*0.5" :width="bigDateWidth"
            :y="ruban.y" :height="ruban.height"
    />
    <timeline-big-date class="large-only"
                       :x="viewBox.x+viewBox.width*0.5" :width="bigDateWidth"
                       :y="ruban.y" :height="ruban.height"
    />
    <timeline-big-date
            :x="viewBox.x+viewBox.width-bigDateWidth*0.5" :width="bigDateWidth"
            :y="ruban.y" :height="ruban.height"
            :max-date="new Date()"
    />

    <rect class="ruban-front"
          :x="ruban.x" :width="ruban.width"
          :y="ruban.y" :height="ruban.height"
    ></rect>
  </g>
</template>

<script>
  import TimelineSmallDate from './TimelineSmallDate'
  import TimelineBigDate from './TimelineBigDate'
  import { dateFromPixel } from '../../services/utils'
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    name: 'Timeline',
    components: { TimelineBigDate, TimelineSmallDate },
    methods: {
      ...mapActions('view', ['lookAt']),
      dateFromPixel,
      timelineClick(e) {
        this.lookAt({ x: this.viewBox.x + e.screenX })
      },
    },
    data: () => ({
      rubanHeight: 40,
      margin: 15,
    }),
    computed: {
      ...mapState('view', ['bigDateWidth']),
      ...mapGetters('view', ['viewBox', 'centuries']),
      ruban() {
        return {
          x: this.viewBox.x - 1,
          y: this.viewBox.y + this.viewBox.height - this.rubanHeight - this.margin,
          width: this.viewBox.width + 2,
          height: this.rubanHeight,
        }
      },
    },
  }
</script>

<style scoped>
  .timeline {
    cursor: pointer;
  }

  .ruban-back {
    fill: var(--timeline-color);
    transition: fill var(--transition-speed);
  }

  .ruban-front {
    fill: none;
    stroke-width: var(--timeline-border-width);
    stroke: var(--timeline-border-color);
    transition: fill var(--transition-speed);
  }
</style>