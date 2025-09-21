import React from 'react';
import BaseNode from '../components/BaseNode/BaseNode';
import { generateNodeHandles } from '../utils/handleUtils';
import { FiCode } from 'react-icons/fi';

const MergeNode = ({ id, data }) => {
  const handles = generateNodeHandles('merge');

  return (
    <BaseNode
      id={id}
      data={{...data, description: "Combines multiple data streams into a single output."}}
      title="Merge"
      icon={<FiCode />}
      nodeType="merge"
      handles={handles}
    >
      <div className="merge-content" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <p style={{ margin: 0 }}>Combines multiple inputs into a single output stream</p>
      </div>
    </BaseNode>
  );
};

export default MergeNode;