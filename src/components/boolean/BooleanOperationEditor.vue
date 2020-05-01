<template>
  <flex-column>
    <operation :operation="operation" @operandClick="operandClick" @operatorClick="operatorClick"/>
    <input type="text" v-model="inputText" v-on:keyup.enter="addInputText"/>
    <textarea class="text-area">{{JSON.stringify(operation, null, 2)}}</textarea>
  </flex-column>
</template>

<script>
  import FlexColumn from '../layout/FlexColumn'
  import FlexLine from '../layout/FlexLine'
  import operation, { operators } from './Operation'

  const { AND, OR } = operators

  export default {
    name: 'boolean-operation-editor',
    components: { operation, FlexLine, FlexColumn },
    props: {
      conditions: { type: Array },
    },
    data: () => (
      {
        inputText: '',
        operation: null,
      }
    ),
    methods: {
      addInputText() {
        const newOperand = { label: this.inputText }
        if (this.isOperation(this.operation)) this.operation.operands.push(newOperand)
        else if (this.operation) this.operation = { operator: AND, operands: [this.operation, newOperand] }
        else this.operation = newOperand
        this.inputText = ''
      },
      operatorClick(operation, parent) {
        if (parent) this.pullUpOperandsFrom(operation, parent)
        else this.switchOperators(operation)
      },
      operandClick(operand, operation) {
        if (operation.operands.length === 1) this.pullUpOperandsFrom(operand, operation)

        const brotherOperation = this.findBrotherOperation(operand, operation)
        if (brotherOperation) this.moveOperandFromParentToBrotherOperation(operand, operation, brotherOperation)
        else this.createOperation(operand, operation)
      },

      switchOperators(operation) {
        if (!this.isOperation(operation)) return
        operation.operator = this.getOppositeOf(operation.operator)
        operation.operands.forEach(this.switchOperators)
      },
      pullUpOperandsFrom(childOperation, parentOperation) {
        const groupIndex = parentOperation.operands.indexOf(childOperation)
        parentOperation.operands.splice(groupIndex, 1, ...childOperation.operands)
      },
      findBrotherOperation(operand, { operands }) {
        const operandIndex = operands.indexOf(operand)
        if (this.isOperation(operands[operandIndex + 1])) return operands[operandIndex + 1]
        else if (this.isOperation(operands[operandIndex - 1])) return operands[operandIndex - 1]
      },
      isOperation(operand) {
        return operand && operand.operands
      },
      createOperation(operand, operation) {
        const { operator: parentOperator, operands } = operation
        const operator = this.getOppositeOf(parentOperator)
        const newGroup = { operator, operands: [operand] }
        const operandIndex = operands.indexOf(operand)
        operands.splice(operandIndex, 1, newGroup)
      },
      moveOperandFromParentToBrotherOperation(operand, parentOperation, brotherOperation) {
        const operandIndex = parentOperation.operands.indexOf(operand)
        const brotherIndex = parentOperation.operands.indexOf(brotherOperation)

        parentOperation.operands.splice(operandIndex, 1)
        operandIndex > brotherIndex
          ? brotherOperation.operands.push(operand)
          : brotherOperation.operands.unshift(operand)

        this.pullUpBrotherIfAlone(brotherOperation, parentOperation)
      },
      pullUpBrotherIfAlone(brotherOperation, parentOperation) {
        if (parentOperation.operands.length !== 1) return
        this.pullUpOperandsFrom(brotherOperation, parentOperation)
        this.switchOperators(parentOperation)
      },
      getOppositeOf(operator) {
        return operator === AND ? OR : AND
      },
    },
  }
</script>

<style scoped>
  .text-area {
    width: 400px;
    height: 400px;
  }
</style>