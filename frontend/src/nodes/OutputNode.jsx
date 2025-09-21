import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { FormField, NodeInput, NodeSelect } from '../components/FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../store/store';
import { generateNodeHandles } from '../utils/handleUtils';
import { FiUpload } from 'react-icons/fi';

const OUTPUT_TYPE_OPTIONS = [
  { value: 'Text', label: 'Text' },
  { value: 'Image', label: 'Image' },
  { value: 'JSON', label: 'JSON' }
];

const OutputNode = ({ id, data }) => {
  const nodeData = useNodeData(id);
  const updateNodeField = useUpdateNodeField();
  
  const outputName = nodeData.outputName || data?.outputName || id.replace('customOutput-', 'output');
  const outputType = nodeData.outputType || data?.outputType || 'Text';
  
  const handleNameChange = (e) => updateNodeField(id, 'outputName', e.target.value);
  const handleTypeChange = (e) => updateNodeField(id, 'outputType', e.target.value);
  const handles = generateNodeHandles('output');

  return (
    <BaseNode
      id={id}
      data={{...data, description: "Final destination for processed data. Defines how results will be delivered."}}
      title="Output"
      icon={<FiUpload />}
      nodeType="output"
      handles={handles}
    >
      <FormField label="Name">
        <NodeInput value={outputName} onChange={handleNameChange} placeholder="Output name" />
      </FormField>
      <FormField label="Type">
        <NodeSelect value={outputType} onChange={handleTypeChange} options={OUTPUT_TYPE_OPTIONS} />
      </FormField>
    </BaseNode>
  );
};

export default OutputNode;