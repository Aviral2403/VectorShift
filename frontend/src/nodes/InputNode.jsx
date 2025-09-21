// src/nodes/InputNode/InputNode.jsx
import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { FormField, NodeInput, NodeSelect } from '../components/FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../store/store';
import { generateNodeHandles } from '../utils/handleUtils';
import { FiDownload } from 'react-icons/fi';

const INPUT_TYPE_OPTIONS = [
  { value: 'Text', label: 'Text' },
  { value: 'File', label: 'File' },
  { value: 'Number', label: 'Number' },
  { value: 'Boolean', label: 'Boolean' }
];

const InputNode = ({ id, data }) => {
  const nodeData = useNodeData(id);
  const updateNodeField = useUpdateNodeField();
  
  // Get current values from store, with fallbacks
  const inputName = nodeData.inputName || data?.inputName || id.replace('customInput-', 'input');
  const inputType = nodeData.inputType || data?.inputType || 'Text';
  
  // Direct handlers that update store immediately
  const handleNameChange = (e) => {
    updateNodeField(id, 'inputName', e.target.value);
  };
  
  const handleTypeChange = (e) => {
    updateNodeField(id, 'inputType', e.target.value);
  };

  // Generate handles dynamically
  const handles = generateNodeHandles('input');

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        description: "Starting point for your workflow. Defines input parameters that will be processed."
      }}
      title="Input"
      icon={<FiDownload />}
      nodeType="input"
      handles={handles}
    >
      <FormField label="Name">
        <NodeInput
          value={inputName}
          onChange={handleNameChange}
          placeholder="Input name"
        />
      </FormField>
      
      <FormField label="Type">
        <NodeSelect
          value={inputType}
          onChange={handleTypeChange}
          options={INPUT_TYPE_OPTIONS}
        />
      </FormField>
    </BaseNode>
  );
};

export default InputNode;