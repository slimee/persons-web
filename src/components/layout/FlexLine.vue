<template>
  <div class="flex-line" @click="$emit('click')">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'flex-line',
  }
</script>

<style scoped>
  .flex-line {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
</style>