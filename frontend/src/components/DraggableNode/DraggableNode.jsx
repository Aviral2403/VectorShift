import { useState } from 'react';
import './DraggableNode.css';

const DraggableNode = ({ type, label, icon, description, collapsed }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.opacity = '0.7';
  };

  const onDragEnd = (event) => {
    event.currentTarget.style.opacity = '1';
  };

  return (
    <div
      className={`draggable-node ${collapsed ? 'icon-only' : ''}`}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      data-nodetype={type}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="node-icon">{icon}</div>
      {!collapsed && <span className="node-label">{label}</span>}
      
      {showTooltip && (
        <div className="node-tooltip">
          <div className="tooltip-header">
            <div className="tooltip-icon">{icon}</div>
            <span className="tooltip-title">{label}</span>
          </div>
          <div className="tooltip-description">{description}</div>
        </div>
      )}
    </div>
  );
};

export default DraggableNode;