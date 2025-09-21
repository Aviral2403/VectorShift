// src/nodes/ConditionalNode/ConditionalNode.jsx
import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { FormField, NodeSelect, NodeInput } from '../components/FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../store/store';
import { generateNodeHandles } from '../utils/handleUtils';
import { FiGitBranch } from 'react-icons/fi';

const OPERATOR_OPTIONS = [
  { value: '==', label: 'Equals (==)' },
  { value: '!=', label: 'Not Equals (!=)' },
  { value: '>', label: 'Greater Than (>)' },
  { value: '<', label: 'Less Than (<)' },
  { value: '>=', label: 'Greater or Equal (>=)' },
  { value: '<=', label: 'Less or Equal (<=)' },
  { value: 'contains', label: 'Contains' }
];

const ConditionalNode = ({ id, data }) => {
  const nodeData = useNodeData(id);
  const updateNodeField = useUpdateNodeField();
  
  // Get current values from store, with fallbacks
  const operator = nodeData.operator || data?.operator || '==';
  const value = nodeData.value || data?.value || '';
  
  // Direct handlers that update store immediately
  const handleOperatorChange = (e) => {
    updateNodeField(id, 'operator', e.target.value);
  };
  
  const handleValueChange = (e) => {
    updateNodeField(id, 'value', e.target.value);
  };

  // Generate handles dynamically
  const handles = generateNodeHandles('conditional');

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        description: "Conditional branching. Routes data based on comparison results."
      }}
      title="Condition"
      icon={<FiGitBranch />}
      nodeType="conditional"
      handles={handles}
    >
      <FormField label="Operator">
        <NodeSelect
          value={operator}
          onChange={handleOperatorChange}
          options={OPERATOR_OPTIONS}
        />
      </FormField>
      
      <FormField label="Value">
        <NodeInput
          value={value}
          onChange={handleValueChange}
          placeholder="Comparison value"
        />
      </FormField>
    </BaseNode>
  );
};

export default ConditionalNode;