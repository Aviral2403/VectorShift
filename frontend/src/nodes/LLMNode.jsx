// src/nodes/LLMNode/LLMNode.jsx
import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { FormField, NodeSelect } from '../components/FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../store/store';
import { generateNodeHandles } from '../utils/handleUtils';
import { FiCpu } from 'react-icons/fi';

const MODEL_OPTIONS = [
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'claude-2', label: 'Claude 2' }
];

const LLMNode = ({ id, data }) => {
  const nodeData = useNodeData(id);
  const updateNodeField = useUpdateNodeField();
  
  // Get current values from store, with fallbacks
  const model = nodeData.model || data?.model || 'gpt-3.5-turbo';
  
  // Direct handler that updates store immediately
  const handleModelChange = (e) => {
    updateNodeField(id, 'model', e.target.value);
  };

  // Generate handles dynamically
  const handles = generateNodeHandles('llm');

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        description: "Large Language Model processor. Configure model parameters and behavior."
      }}
      title="LLM"
      icon={<FiCpu />}
      nodeType="llm"
      handles={handles}
    >
      <FormField label="Model">
        <NodeSelect
          value={model}
          onChange={handleModelChange}
          options={MODEL_OPTIONS}
        />
      </FormField>
    </BaseNode>
  );
};

export default LLMNode;