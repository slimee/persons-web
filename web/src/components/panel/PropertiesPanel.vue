<template>
  <div class="layout" @click.self="close">
    <div class="panel">
      <div class="close panel-top-right" @click="close">×</div>
      <div v-for="property in properties">
        {{property.title}}
      </div>
    </div>
  </div>
</template>

<script>

  import properties from '../../services/properties'

  export default {
    name: 'PropertiesPanel',
    data: () => ({
      properties: [],
    }),
    mounted() {
      properties
        .find()
        .then(properties => this.properties = properties)
    },
    methods: {
      close() {
        this.$emit('close')
      },
    },
  }
</script>

<style scoped>

</style>