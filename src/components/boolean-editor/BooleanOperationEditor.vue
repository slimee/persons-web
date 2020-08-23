<template>
  <operation
          :operation="operation"
          @operandClick="operandClick" @operatorClick="operatorClick"
  />
</template>

<script>
  import operation, { operators } from './Operation'

  const { AND, OR } = operators

  export default {
    name: 'boolean-operation-editor',
    components: { operation },
    props: {
      operands: { type: Array },
    },
    watch: {
      operands(operands) {
        operands.forEach(operand => {
          if (!this.innerOperands.find(o => o === operand)) this.addOperand(operand)
        })
        //TODO remove operand
      },
    },
    data: () => (
      {
        innerOperands: [],
        operation: null,
      }
    ),
    methods: {
      operatorClick(operation, parent) {
        if (parent) this.pullUpOperandsFrom(operation, parent)
        else this.switchOperators(operation)
        this.updateValue()
      },
      operandClick(operand, parent) {
        const brothers = parent.operands
        if (brothers.length === 1) this.pullUpOperandsFrom(operand, parent)

        const brotherOperation = this.findBrotherOperation(operand, parent)
        if (brotherOperation) this.moveOperandToBrotherOperation(operand, brotherOperation, parent)
        else if (brothers.length > 2) this.createOperation(operand, parent)
        this.updateValue()
      },
      addOperand(newOperand) {
        this.innerOperands.push(newOperand)
        if (!this.operation) this.operation = newOperand
        else if (this.isSimpleOperand(this.operation)) this.operation = {
          operator: AND,
          operands: [this.operation, newOperand],
        }
        else this.operation.operands.push(newOperand)
        this.updateValue()
      },
      updateValue() {
        this.$emit('value', this.operation)
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
      isSimpleOperand(operation) {
        return !this.isOperation(operation)
      },
      createOperation(operand, operation) {
        const { operator: parentOperator, operands } = operation
        const operator = this.getOppositeOf(parentOperator)
        const newOperation = { operator, operands: [operand], id: Math.random() }
        const operandIndex = operands.indexOf(operand)
        operands.splice(operandIndex, 1, newOperation)
      },
      moveOperandToBrotherOperation(operand, brotherOperation, parentOperation) {
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