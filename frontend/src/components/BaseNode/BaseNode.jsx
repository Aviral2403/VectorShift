// src/components/BaseNode/BaseNode.jsx
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

const BaseNode = ({ 
  id, 
  data, 
  title, 
  handles = [], 
  children, 
  className = '', 
  style = {}, 
  description 
}) => {
  return (
    <div 
      className={`base-node ${className}`}
      style={style}
      data-nodeid={id}
    >
      <div className="node-header">
        <span className="node-title">{title}</span>
        {data?.nodeType && (
          <span className="node-type-badge">{data.nodeType}</span>
        )}
      </div>
      
      <div className="node-content">
        {children}
      </div>

      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style || {}}
          className={`node-handle ${handle.type}`}
        />
      ))}

      {description && (
        <div className="node-description">
          {description}
        </div>
      )}
    </div>
  );
};

export default BaseNode;