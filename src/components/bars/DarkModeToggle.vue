<template>
  <toggle class="dark-overview clickable hoverable" on="🌑" off="🌕" :input="dark" @toggle="setDark"/>
</template>

<script>
  import Toggle from './Toggle'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'darkModeToggle',
    components: { Toggle },
    computed: {
      ...mapState('layout', ['dark']),
    },
    methods: {
      ...mapActions('layout', ['setDark']),
    },
  }
</script>

<style>
  .dark-overview {
    position: absolute;
    top: var(--overview-margin);
    left: var(--overview-margin);
    background-color: var(--search-color);
    padding: var(--overview-padding);
    border-radius: var(--overview-radius);
    border: var(--search-overview-border);

    transition: background-color var(--transition-speed);
  }

</style>