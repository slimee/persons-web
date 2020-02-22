<template>
  <flex-column>
    <div v-for="item in items" @click="$emit('click', item)" @mousedown.prevent
         class="clickable hoverable" :key="item[keyName]">
      <slot name="item" :item="item"/>
    </div>
  </flex-column>
</template>

<script>
  import FlexColumn from './layout/FlexColumn'

  export default {
    name: 'List',
    components: { FlexColumn },
    props: {
      items: { required: true, type: Array },
      keyName: { default: '_id' },
    },
  }
</script>

<style>
</style>