// src/components/BaseNode/BaseNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';
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
  },
  // New node types
  timer: {
    colors: {
      bg: 'rgba(100, 116, 139, 0.1)',
      border: 'rgba(100, 116, 139, 0.5)',
      header: 'rgba(100, 116, 139, 0.2)',
      handle: '#64748b',
      hover: '#64748b'
    },
    handles: ['trigger', 'output']
  },
  filter: {
    colors: {
      bg: 'rgba(6, 182, 212, 0.1)',
      border: 'rgba(6, 182, 212, 0.5)',
      header: 'rgba(6, 182, 212, 0.2)',
      handle: '#06b6d4',
      hover: '#06b6d4'
    },
    handles: ['input', 'passed', 'rejected']
  },
  loop: {
    colors: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.5)',
      header: 'rgba(245, 158, 11, 0.2)',
      handle: '#f59e0b',
      hover: '#f59e0b'
    },
    handles: ['items', 'control', 'current', 'complete']
  },
  webhook: {
    colors: {
      bg: 'rgba(99, 102, 241, 0.1)',
      border: 'rgba(99, 102, 241, 0.5)',
      header: 'rgba(99, 102, 241, 0.2)',
      handle: '#6366f1',
      hover: '#6366f1'
    },
    handles: ['payload']
  },
  database: {
    colors: {
      bg: 'rgba(6, 182, 212, 0.1)',
      border: 'rgba(6, 182, 212, 0.5)',
      header: 'rgba(6, 182, 212, 0.2)',
      handle: '#06b6d4',
      hover: '#06b6d4'
    },
    handles: ['input', 'result']
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

      {/* Render handles exactly as provided from registry */}
      {handles.map((handle, index) => {
        // Use the handle style exactly as provided - nodeRegistry calculates correct positions
        const handleStyle = handle.style || {};

        return (
          <Handle
            key={`handle-${id}-${handle.id}-${index}`}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={handleStyle}
            className={`node-handle ${handle.type}`}
            isConnectable={true}
          />
        );
      })}

      {/* Render labels outside the node - matching handle positions */}
      {handles.map((handle, index) => {
        const topPosition = handle.style?.top || '50%';

        const labelStyle = {
          position: 'absolute',
          top: topPosition,
          transform: 'translateY(-50%)',
          fontSize: '0.65rem',
          fontWeight: 500,
          color: 'var(--text-secondary, #64748b)',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2px 6px',
          borderRadius: '3px',
          whiteSpace: 'nowrap',
          border: '1px solid var(--node-border, rgba(0, 0, 0, 0.15))',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
          pointerEvents: 'none',
          zIndex: 5,
          // Labels positioned OUTSIDE the node on correct side
          ...(handle.type === 'target'
            ? { right: 'calc(100% + 12px)' }  // Left handle: label outside on left
            : { left: 'calc(100% + 12px)' }   // Right handle: label outside on right
          )
        };

        return (
          <span
            key={`label-${id}-${handle.id}-${index}`}
            className={`handle-label handle-label-${handle.type}`}
            style={labelStyle}
          >
            {handle.id}
          </span>
        );
      })}

      {description && (
        <div className="node-description">
          {description}
        </div>
      )}
    </div>
  );
};

export default BaseNode;