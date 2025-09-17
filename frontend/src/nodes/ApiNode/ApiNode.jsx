import { useState } from 'react';
import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import useNodeField from '../../hooks/useNodeField';
import { FiZap } from 'react-icons/fi';
import './ApiNode.css';

const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  useNodeField(id, 'url', url);
  useNodeField(id, 'method', method);

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleMethodChange = (e) => setMethod(e.target.value);

  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      icon={<FiZap />}
      className="api-node"
      description="API integration. Makes HTTP requests to external services."
      handles={[
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'response', type: 'source', position: Position.Right }
      ]}
    >
      <div className="api-fields">
        <label className="node-label">Method</label>
        <select
          className="node-select"
          value={method}
          onChange={handleMethodChange}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
                
        <label className="node-label">URL</label>
        <input
          type="text"
          className="node-input"
          value={url}
          onChange={handleUrlChange}
          placeholder="API endpoint URL"
        />
      </div>
    </BaseNode>
  );
};

export default ApiNode;