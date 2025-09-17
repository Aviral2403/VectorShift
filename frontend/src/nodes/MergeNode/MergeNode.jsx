import BaseNode from '../../components/BaseNode/BaseNode';
import { Handle, Position } from 'reactflow';
import { FiCode } from 'react-icons/fi';
import './MergeNode.css';

const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      icon={<FiCode />}
      className="merge-node"
      description="Combines multiple data streams into a single output."
      handles={[
        { id: 'input1', type: 'target', position: Position.Left, style: { top: '30%' } },
        { id: 'input2', type: 'target', position: Position.Left, style: { top: '70%' } },
        { id: 'output', type: 'source', position: Position.Right }
      ]}
    >
      <div className="merge-content">
        <p>Combines multiple inputs into a single output stream</p>
      </div>
    </BaseNode>
  );
};

export default MergeNode;