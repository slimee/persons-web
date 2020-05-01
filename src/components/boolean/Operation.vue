<template>
  <flex-line v-if="isOperation(operation)" style="align-items: unset">
    <flex-column class="operator" :class="operatorClass(operation)" @click="operatorClick(operation, parent)">
      {{operatorLabel(operation)}}
    </flex-column>
    <flex-column class="operands">
      <template v-for="operand in operation.operands">
        <operation v-if="isOperation(operand)"
                   :operation="operand" :parent="operation"
                   @operatorClick="operatorClick"
                   @operandClick="operandClick"
        />
        <div class="label" v-else @click="operandClick(operand, operation)">
          {{operand.label}}
        </div>
      </template>
    </flex-column>
  </flex-line>
  <div class="label" v-else>{{operation.label}}</div>
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
      operatorClass(operation) {
        const andOr = operation.operator === operators.AND ? 'and' : 'or'
        return operation.operands.length === 1 ? `${andOr} one` : andOr
      },
      operatorLabel({ operator }) {
        return operator === operators.AND ? 'et' : 'ou'
      },
      isOperation(operand) {
        return operand && operand.operands
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
    transition: all .3s;
  }

  .label {
    margin-left: 0.3em;
  }

  .operands {
    cursor: pointer;
  }

  .and {
    background-color: #f6db53;
  }

  .or {
    background-color: #84DCC6;
  }

  .one {
    width: 1em;
    opacity: 50%;
  }
</style>