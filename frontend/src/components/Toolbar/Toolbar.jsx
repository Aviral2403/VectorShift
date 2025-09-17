import {
  FiGitBranch, FiLayers, FiRotateCw, FiLogIn, FiLogOut,
  FiZap
} from 'react-icons/fi';
import {
  HiOutlineDocumentText, HiOutlineCpuChip,
  HiOutlineCalculator, HiOutlineGlobeAlt,
} from 'react-icons/hi2';
import DraggableNode from '../DraggableNode/DraggableNode';
import './Toolbar.css';

const nodeTypes = [
  {
    type: 'customInput',
    label: 'Input',
    icon: <FiLogIn size={20} />,
    description: 'Starting point for your workflow data',
    category: 'Inputs'
  },
  {
    type: 'customOutput',
    label: 'Output',
    icon: <FiLogOut size={20} />,
    description: 'Final output node for your workflow',
    category: 'Outputs'
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: <HiOutlineCpuChip size={20} />,
    description: 'Large Language Model processing',
    category: 'AI'
  },
  {
    type: 'text',
    label: 'Text',
    icon: <HiOutlineDocumentText size={20} />,
    description: 'Text processing and templating',
    category: 'Data'
  },
  {
    type: 'conditional',
    label: 'Condition',
    icon: <FiGitBranch size={20} />,
    description: 'Conditional logic and branching',
    category: 'Logic'
  },
  {
    type: 'math',
    label: 'Math',
    icon: <HiOutlineCalculator size={20} />,
    description: 'Mathematical operations',
    category: 'Logic'
  },
  {
    type: 'api',
    label: 'API',
    icon: <FiZap size={20} />,
    description: 'API integration and requests',
    category: 'API'
  },
  {
    type: 'dataTransform',
    label: 'Transform',
    icon: <FiRotateCw size={20} />,
    description: 'Data transformation and processing',
    category: 'Data'
  },
  {
    type: 'merge',
    label: 'Merge',
    icon: <FiLayers size={20} />,
    description: 'Merge multiple data streams',
    category: 'Data'
  },
];

const categoryOrder = ['Inputs', 'Outputs', 'AI', 'Data', 'Logic', 'API'];

const PipelineToolbar = ({ collapsed }) => {
  const nodesByCategory = nodeTypes.reduce((acc, node) => {
    if (!acc[node.category]) acc[node.category] = [];
    acc[node.category].push(node);
    return acc;
  }, {});

  return (
    <div className={`toolbar-container ${collapsed ? 'collapsed' : ''}`}>
      

      {categoryOrder.map(category => (
        nodesByCategory[category] && (
          <div key={category} className="category-section">
            {!collapsed && <h4 className="category-title">{category}</h4>}
            <div className="nodes-list">
              {nodesByCategory[category].map((node) => (
                <DraggableNode
                  key={node.type}
                  type={node.type}
                  label={node.label}
                  icon={node.icon}
                  description={node.description}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default PipelineToolbar;