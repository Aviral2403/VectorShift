import { useState } from 'react';
import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import useNodeField from '../../hooks/useNodeField';
import { FiDivideCircle } from 'react-icons/fi';
import './MathNode.css';

const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [value, setValue] = useState(data?.value || '');

  useNodeField(id, 'operation', operation);
  useNodeField(id, 'value', value);

  const handleOperationChange = (e) => setOperation(e.target.value);
  const handleValueChange = (e) => setValue(e.target.value);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      icon={<FiDivideCircle />}
      className="math-node"
      description="Mathematical operations. Performs calculations on input values."
      handles={[
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'output', type: 'source', position: Position.Right }
      ]}
    >
      <div className="math-fields">
        <label className="node-label">Operation</label>
        <select
          className="node-select"
          value={operation}
          onChange={handleOperationChange}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
          <option value="power">Power (^)</option>
          <option value="modulo">Modulo (%)</option>
        </select>
                
        <label className="node-label">Value</label>
        <input
          type="number"
          className="node-input"
          value={value}
          onChange={handleValueChange}
          placeholder="Number value"
          step="any"
        />
      </div>
    </BaseNode>
  );
};

export default MathNode;