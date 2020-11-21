<template>
  <div id="app" :class="['full-height', 'light',{'dark' : dark}, 'PersonTimeline']">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'app',
    mounted() {
      this.$store.dispatch('app/startApp')
    },
    computed: {
      ...mapState('layout', ['dark']),
    },
  }
</script>

<style>

</style>