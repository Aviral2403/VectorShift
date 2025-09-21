// src/components/BaseNode/BaseNode.jsx
import React from 'react';
import { Handle } from 'reactflow';
import './BaseNode.css';

// Node type configurations with colors and handle positions
const NODE_CONFIGS = {
  input: {
    colors: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.5)',
      header: 'rgba(16, 185, 129, 0.2)',
      handle: '#10b981',
      hover: '#10b981'
    },
    handles: ['output']
  },
  output: {
    colors: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.5)', 
      header: 'rgba(239, 68, 68, 0.2)',
      handle: '#ef4444',
      hover: '#ef4444'
    },
    handles: ['input']
  },
  text: {
    colors: {
      bg: 'rgba(139, 92, 246, 0.1)',
      border: 'rgba(139, 92, 246, 0.3)',
      header: 'rgba(139, 92, 246, 0.2)',
      handle: '#8b5cf6',
      hover: '#8b5cf6'
    },
    handles: ['input', 'output']
  },
  llm: {
    colors: {
      bg: 'rgba(59, 130, 246, 0.1)',
      border: 'rgba(59, 130, 246, 0.5)',
      header: 'rgba(59, 130, 246, 0.2)',
      handle: '#3b82f6',
      hover: '#3b82f6'
    },
    handles: ['input', 'output']
  },
  math: {
    colors: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.5)',
      header: 'rgba(16, 185, 129, 0.2)',
      handle: '#10b981',
      hover: '#10b981'
    },
    handles: ['input', 'output']
  },
  conditional: {
    colors: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.5)',
      header: 'rgba(245, 158, 11, 0.2)',
      handle: '#f59e0b',
      hover: '#f59e0b'
    },
    handles: ['input', 'output-true', 'output-false']
  },
  api: {
    colors: {
      bg: 'rgba(99, 102, 241, 0.1)',
      border: 'rgba(99, 102, 241, 0.5)',
      header: 'rgba(99, 102, 241, 0.2)',
      handle: '#6366f1',
      hover: '#6366f1'
    },
    handles: ['input', 'output']
  },
  transform: {
    colors: {
      bg: 'rgba(168, 85, 247, 0.1)',
      border: 'rgba(168, 85, 247, 0.5)',
      header: 'rgba(168, 85, 247, 0.2)',
      handle: '#a855f7',
      hover: '#a855f7'
    },
    handles: ['input', 'output']
  },
  merge: {
    colors: {
      bg: 'rgba(100, 116, 139, 0.1)',
      border: 'rgba(100, 116, 139, 0.5)',
      header: 'rgba(100, 116, 139, 0.2)',
      handle: '#64748b',
      hover: '#64748b'
    },
    handles: ['input-1', 'input-2', 'output']
  }
};

const BaseNode = ({ 
  id, 
  data, 
  title, 
  icon,
  handles = [], 
  children, 
  className = '', 
  style = {}, 
  description,
  nodeType
}) => {
  const config = NODE_CONFIGS[nodeType] || NODE_CONFIGS.text;
  
  const nodeStyle = {
    '--node-bg': config.colors.bg,
    '--node-border': config.colors.border,
    '--node-header-bg': config.colors.header,
    '--node-handle': config.colors.handle,
    '--node-hover': config.colors.hover,
    ...style
  };

  return (
    <div 
      className={`base-node ${className}`}
      style={nodeStyle}
      data-nodeid={id}
      data-nodetype={nodeType}
    >
      <div className="node-header">
        <div className="node-title-section">
          {icon && <span className="node-icon">{icon}</span>}
          <span className="node-title">{title}</span>
        </div>
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