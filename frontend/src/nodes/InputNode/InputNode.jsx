import { useState } from 'react';
import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import useNodeField from '../../hooks/useNodeField';
import { FiDownload } from 'react-icons/fi';
import './InputNode.css';

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  useNodeField(id, 'inputName', currName);
  useNodeField(id, 'inputType', inputType);

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon={<FiDownload />}
      className="input-node"
      description="Starting point for your workflow. Defines input parameters that will be processed."
      handles={[
        { id: 'value', type: 'source', position: Position.Right }
      ]}
    >
      <div className="input-fields">
        <label className="node-label">Name</label>
        <input
          type="text"
          className="node-input"
          value={currName}
          onChange={handleNameChange}
          placeholder="Input name"
        />
                
        <label className="node-label">Type</label>
        <select 
          className="node-select"
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Number">Number</option>
          <option value="Boolean">Boolean</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default InputNode;