// src/nodes/MathNode/MathNode.jsx
import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { FormField, NodeSelect, NodeInput } from '../components/FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../store/store';
import { generateNodeHandles } from '../utils/handleUtils';
import { FiDivideCircle } from 'react-icons/fi';

const OPERATION_OPTIONS = [
  { value: 'add', label: 'Add (+)' },
  { value: 'subtract', label: 'Subtract (-)' },
  { value: 'multiply', label: 'Multiply (×)' },
  { value: 'divide', label: 'Divide (÷)' },
  { value: 'power', label: 'Power (^)' },
  { value: 'modulo', label: 'Modulo (%)' }
];

const MathNode = ({ id, data }) => {
  const nodeData = useNodeData(id);
  const updateNodeField = useUpdateNodeField();
  
  // Get current values from store, with fallbacks
  const operation = nodeData.operation || data?.operation || 'add';
  const value = nodeData.value || data?.value || '';
  
  // Direct handlers that update store immediately
  const handleOperationChange = (e) => {
    updateNodeField(id, 'operation', e.target.value);
  };
  
  const handleValueChange = (e) => {
    updateNodeField(id, 'value', e.target.value);
  };

  // Generate handles dynamically
  const handles = generateNodeHandles('math');

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        description: "Mathematical operations. Performs calculations on input values."
      }}
      title="Math"
      icon={<FiDivideCircle />}
      nodeType="math"
      handles={handles}
    >
      <FormField label="Operation">
        <NodeSelect
          value={operation}
          onChange={handleOperationChange}
          options={OPERATION_OPTIONS}
        />
      </FormField>
      
      <FormField label="Value">
        <NodeInput
          type="number"
          value={value}
          onChange={handleValueChange}
          placeholder="Number value"
          step="any"
        />
      </FormField>
    </BaseNode>
  );
};

export default MathNode;