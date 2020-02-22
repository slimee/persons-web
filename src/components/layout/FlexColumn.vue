<template>
  <div class="flex-column" @click="$emit('click')">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'flex-column',
    props: ['maxHeight'],
  }
</script>

<style scoped>
  .flex-column {
    display: flex;
    flex-flow: column nowrap;
  }
</style>