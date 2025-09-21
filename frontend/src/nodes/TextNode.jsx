// src/nodes/TextNode/TextNode.jsx
import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { FormField, NodeInput, VariablesInfo } from '../components/FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../store/store';
import { generateNodeHandles, extractVariables } from '../utils/handleUtils';
import { FiEdit } from 'react-icons/fi';

const TextNode = ({ id, data }) => {
  const nodeData = useNodeData(id);
  const updateNodeField = useUpdateNodeField();
  
  // Get current values from store, with fallbacks
  const text = nodeData.text || data?.text || '{{input}}';
  const variables = extractVariables(text);
  
  // Direct handlers that update store immediately
  const handleTextChange = (e) => {
    const newText = e.target.value;
    updateNodeField(id, 'text', newText);
    
    // Also update variables when text changes
    const newVariables = extractVariables(newText);
    updateNodeField(id, 'variables', newVariables);
  };

  // Generate handles dynamically based on current text
  const handles = generateNodeHandles('text', { text });

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        description: "Text processing and templating node"
      }}
      title="Text"
      icon={<FiEdit />}
      nodeType="text"
      handles={handles}
    >
      <FormField label="Text Content">
        <NodeInput
          type="textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}"
          rows={3}
        />
      </FormField>
      
      <VariablesInfo variables={variables} />
    </BaseNode>
  );
};

export default TextNode;