import { useState } from 'react';
import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import useNodeField from '../../hooks/useNodeField';
import { FiFilter } from 'react-icons/fi';
import './DataTransformNode.css';

const DataTransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'filter');
  const [expression, setExpression] = useState(data?.expression || '');

  useNodeField(id, 'transformType', transformType);
  useNodeField(id, 'expression', expression);

  const handleTransformTypeChange = (e) => setTransformType(e.target.value);
  const handleExpressionChange = (e) => setExpression(e.target.value);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      icon={<FiFilter />}
      className="transform-node"
      description="Data transformation. Manipulates input data according to specified rules."
      handles={[
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'output', type: 'source', position: Position.Right }
      ]}
    >
      <div className="transform-fields">
        <label className="node-label">Transform Type</label>
        <select
          className="node-select"
          value={transformType}
          onChange={handleTransformTypeChange}
        >
          <option value="filter">Filter</option>
          <option value="map">Map</option>
          <option value="sort">Sort</option>
          <option value="group">Group</option>
          <option value="reduce">Reduce</option>
        </select>
                
        <label className="node-label">Expression</label>
        <textarea
          className="node-input"
          value={expression}
          onChange={handleExpressionChange}
          placeholder="JavaScript expression"
          rows={2}
        />
      </div>
    </BaseNode>
  );
};

export default DataTransformNode;