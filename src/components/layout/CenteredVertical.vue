<template>
  <flex-line class="full-height">
    <spacer/>
    <flex-column>
      <spacer/>
      <slot/>
      <spacer/>
    </flex-column>
    <spacer/>
  </flex-line>
</template>
<script>
  import FlexColumn from './FlexColumn'
  import FlexLine from './FlexLine'
  import Spacer from './Spacer'

  export default {
    name: 'CenteredVertical',
    components: { FlexColumn, FlexLine, Spacer },
  }
</script>