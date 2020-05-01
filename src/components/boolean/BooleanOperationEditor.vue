<template>
  <div>
    <operation :operation="operation"
               @operandClick="operandClick"
               @operatorClick="operatorClick"
    />
    <textarea class="text-area">
      {{JSON.stringify(operation, null, 2)}}
    </textarea>
  </div>
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
        operation: {
          operator: AND,
          operands: [
            { label: 'two' },
            { label: 'three' },
            { operator: OR, operands: [{ label: 'one' }] },
          ],
        },
      }
    ),
    mounted() {
    },
    watch: {},
    methods: {
      operatorClick(operation, parent) {
        const isRootOperation = !parent
        if (isRootOperation) this.switchOperators(operation)
        else this.pullUpOperandsFrom(operation, parent)
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

      operandClick(operand, operation) {
        if (operation.operands.length === 1) this.pullUpOperandsFrom(operand, operation)
        const closerOperation = this.findOperationToAddOperand(operand, operation)
        if (!closerOperation) this.createGroup(operand, operation)
        else this.moveOperandFromParentToBrotherOperation(operand, operation, closerOperation)
      },
      findOperationToAddOperand(operand, { operands }) {
        const operandIndex = operands.indexOf(operand)
        if (this.isOperationAtIndexIn(operandIndex + 1, operands)) return operands[operandIndex + 1]
        else if (this.isOperationAtIndexIn(operandIndex - 1, operands)) return operands[operandIndex - 1]
      },
      isOperationAtIndexIn(index, operands) {
        if (index < 0) return null
        if (index > operands.length - 1) return null
        return this.isOperation(operands[index])
      },
      isOperation(operand) {
        return operand.operands
      },
      createGroup(operand, operation) {
        const { operator, operands } = operation
        const newGroup = { operator: this.getOppositeOf(operator), operands: [operand] }
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