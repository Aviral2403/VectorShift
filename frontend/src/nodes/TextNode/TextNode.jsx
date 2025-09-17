import { useState } from 'react';
import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import useNodeResize from '../../hooks/useNodeResize';
import useTemplateVariables from '../../hooks/useTemplateVariables';
import useNodeField from '../../hooks/useNodeField';
import { FiEdit } from 'react-icons/fi';
import './TextNode.css';

const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [nodeRef, dimensions] = useNodeResize([text]);
  const variables = useTemplateVariables(text);

  useNodeField(id, 'text', text);
  useNodeField(id, 'variables', variables);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const inputHandles = variables.map((varName, index) => ({
    id: varName,
    type: 'target',
    position: Position.Left,
    style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` }
  }));

  const outputHandles = [{
    id: 'output',
    type: 'source',
    position: Position.Right
  }];

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        description: "Text processing and templating node"
      }}
      title="Text"
      className="text-node"
      handles={[...inputHandles, ...outputHandles]}
    >
      <div ref={nodeRef} className="text-node-content">
        <label className="node-label">Text Content</label>
        <textarea
          className="node-input text-area"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}"
          rows={3}
        />
        {variables.length > 0 && (
          <div className="variables-info">
            <span>Variables: {variables.join(', ')}</span>
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default TextNode;