import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { FormField, NodeInput, NodeSelect } from '../components/FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../store/store';
import { generateNodeHandles } from '../utils/handleUtils';
import { FiZap } from 'react-icons/fi';

const METHOD_OPTIONS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' }
];

const ApiNode = ({ id, data }) => {
  const nodeData = useNodeData(id);
  const updateNodeField = useUpdateNodeField();
  
  const url = nodeData.url || data?.url || 'https://api.example.com';
  const method = nodeData.method || data?.method || 'GET';
  
  const handleUrlChange = (e) => updateNodeField(id, 'url', e.target.value);
  const handleMethodChange = (e) => updateNodeField(id, 'method', e.target.value);
  const handles = generateNodeHandles('api');

  return (
    <BaseNode
      id={id}
      data={{...data, description: "API integration. Makes HTTP requests to external services."}}
      title="API"
      icon={<FiZap />}
      nodeType="api"
      handles={handles}
    >
      <FormField label="Method">
        <NodeSelect value={method} onChange={handleMethodChange} options={METHOD_OPTIONS} />
      </FormField>
      <FormField label="URL">
        <NodeInput value={url} onChange={handleUrlChange} placeholder="API endpoint URL" />
      </FormField>
    </BaseNode>
  );
};

export default ApiNode;