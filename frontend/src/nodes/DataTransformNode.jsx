import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { FormField, NodeSelect, NodeInput } from '../components/FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../store/store';
import { generateNodeHandles } from '../utils/handleUtils';
import { FiFilter } from 'react-icons/fi';

const TRANSFORM_OPTIONS = [
  { value: 'filter', label: 'Filter' },
  { value: 'map', label: 'Map' },
  { value: 'sort', label: 'Sort' },
  { value: 'group', label: 'Group' },
  { value: 'reduce', label: 'Reduce' }
];

const DataTransformNode = ({ id, data }) => {
  const nodeData = useNodeData(id);
  const updateNodeField = useUpdateNodeField();
  
  const transformType = nodeData.transformType || data?.transformType || 'filter';
  const expression = nodeData.expression || data?.expression || '';
  
  const handleTransformTypeChange = (e) => updateNodeField(id, 'transformType', e.target.value);
  const handleExpressionChange = (e) => updateNodeField(id, 'expression', e.target.value);
  const handles = generateNodeHandles('transform');

  return (
    <BaseNode
      id={id}
      data={{...data, description: "Data transformation. Manipulates input data according to specified rules."}}
      title="Transform"
      icon={<FiFilter />}
      nodeType="transform"
      handles={handles}
    >
      <FormField label="Transform Type">
        <NodeSelect value={transformType} onChange={handleTransformTypeChange} options={TRANSFORM_OPTIONS} />
      </FormField>
      <FormField label="Expression">
        <NodeInput type="textarea" value={expression} onChange={handleExpressionChange} placeholder="JavaScript expression" rows={2} />
      </FormField>
    </BaseNode>
  );
};

export default DataTransformNode;