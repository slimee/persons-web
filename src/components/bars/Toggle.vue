<template>
  <div class="icon" @click="click">{{icon}}</div>
</template>

<script>
  export default {
    name: 'Toggle',
    props: {
      on: { type: String, required: true },
      off: { type: String, required: true },
      input: { type: Boolean, required: true },
    },
    methods: {
      click() {
        this.$emit('toggle', !this.input)
      },
    },
    computed: {
      icon() {
        return this.input ? this.on : this.off
      },
    },
  }
</script>

<style scoped>

</style>