import { useState } from 'react';
import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import useNodeField from '../../hooks/useNodeField';
import { FiUpload } from 'react-icons/fi';
import './OutputNode.css';

const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  useNodeField(id, 'outputName', currName);
  useNodeField(id, 'outputType', outputType);

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon={<FiUpload />}
      className="output-node"
      description="Final destination for processed data. Defines how results will be delivered."
      handles={[
        { id: 'value', type: 'target', position: Position.Left }
      ]}
    >
      <div className="output-fields">
        <label className="node-label">Name</label>
        <input
          type="text"
          className="node-input"
          value={currName}
          onChange={handleNameChange}
          placeholder="Output name"
        />
                
        <label className="node-label">Type</label>
        <select
          className="node-select"
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="JSON">JSON</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default OutputNode;