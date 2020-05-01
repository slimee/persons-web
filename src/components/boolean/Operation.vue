<template>
  <flex-line style="align-items: unset">
    <flex-column class="operator" :class="operatorClass(operation.operator)" @click="operatorClick(operation, parent)">
      {{operatorLabel(operation.operator)}}
    </flex-column>
    <flex-column class="operands">
      <template v-for="operand in operation.operands">
        <div v-if="operand.label" @click="operandClick(operand, operation)">
          {{operand.label}}
        </div>
        <operation v-else-if="operand.operator"
                  :operation="operand" :parent="operation"
                  @operatorClick="operatorClick"
                  @operandClick="operandClick"
        />
      </template>
    </flex-column>
  </flex-line>
</template>

<script>
  import FlexLine from '../layout/FlexLine'
  import FlexColumn from '../layout/FlexColumn'

  export const operators = {
    AND: 'and',
    OR: 'or',
  }

  export default {
    name: 'operation',
    components: { FlexColumn, FlexLine },
    props: ['operation', 'parent'],
    methods: {
      operatorClick(operator, parent) {
        this.$emit('operatorClick', operator, parent)
      },
      operandClick(operand, operation) {
        this.$emit('operandClick', operand, operation)
      },
      operatorClass(operator) {
        return operator === operators.AND ? 'and' : 'or'
      },
      operatorLabel(operator) {
        return operator === operators.AND ? 'ou' : 'et'
      },
    },
  }
</script>

<style scoped>
  .operator {
    width: 2em;
    text-align: center;
    cursor: pointer;
    justify-content: center;
  }

  .operands {
    margin-left: 0.5em;
    cursor: pointer;
  }

  .and {
    background-color: #2493e6;
  }

  .or {
    background-color: #eebe7b;
  }
</style>