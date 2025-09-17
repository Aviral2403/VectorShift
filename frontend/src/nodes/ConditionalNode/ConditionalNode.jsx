import { useState } from 'react';
import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import useNodeField from '../../hooks/useNodeField';
import { FiGitBranch } from 'react-icons/fi';
import './ConditionalNode.css';

const ConditionalNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || '==');
  const [value, setValue] = useState(data?.value || '');

  useNodeField(id, 'operator', operator);
  useNodeField(id, 'value', value);

  const handleOperatorChange = (e) => setOperator(e.target.value);
  const handleValueChange = (e) => setValue(e.target.value);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      icon={<FiGitBranch />}
      className="conditional-node"
      description="Conditional branching. Routes data based on comparison results."
      handles={[
        { id: 'input', type: 'target', position: Position.Left, style: { top: '30%' } },
        { id: 'true', type: 'source', position: Position.Right, style: { top: '30%' } },
        { id: 'false', type: 'source', position: Position.Right, style: { top: '70%' } }
      ]}
    >
      <div className="conditional-fields">
        <div className="condition-row">
          <select
            className="node-select"
            value={operator}
            onChange={handleOperatorChange}
          >
            <option value="==">Equals (==)</option>
            <option value="!=">Not Equals (!=)</option>
            <option value=">">Greater Than (&gt;)</option>
            <option value="<">Less Than (&lt;)</option>
            <option value=">=">Greater or Equal (&gt;=)</option>
            <option value="<=">Less or Equal (&lt;=)</option>
            <option value="contains">Contains</option>
          </select>
        </div>
        <div className="condition-row">
          <input
            type="text"
            className="node-input"
            value={value}
            onChange={handleValueChange}
            placeholder="Comparison value"
          />
        </div>
      </div>
    </BaseNode>
  );
};

export default ConditionalNode;