// src/nodes/LLMNode/LLMNode.jsx
import { useState } from 'react';
import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import useNodeField from '../../hooks/useNodeField';
import { FiCpu } from 'react-icons/fi';
import './LLMNode.css';

const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-3.5-turbo');

  useNodeField(id, 'model', model);

  const handleModelChange = (e) => setModel(e.target.value);

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      icon={<FiCpu />}
      className="llm-node"
      description="Large Language Model processor. Configure model parameters and behavior."
      handles={[
        { id: 'system', type: 'target', position: Position.Left, style: { top: '30%' } },
        { id: 'prompt', type: 'target', position: Position.Left, style: { top: '70%' } },
        { id: 'response', type: 'source', position: Position.Right }
      ]}
    >
      <div className="llm-fields">
        <label className="node-label">Model</label>
        <select
          className="node-select"
          value={model}
          onChange={handleModelChange}
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude-2">Claude 2</option>
        </select>
                
      </div>
    </BaseNode>
  );
};

export default LLMNode;