/**
 * Toolbar.jsx - Node palette for drag-and-drop
 * Uses node registry for configuration
 */
import {
  FiGitBranch, FiLayers, FiRotateCw, FiLogIn, FiLogOut,
  FiZap, FiClock, FiFilter, FiRepeat, FiLink, FiDatabase
} from 'react-icons/fi';
import {
  HiOutlineDocumentText, HiOutlineCpuChip,
  HiOutlineCalculator
} from 'react-icons/hi2';
import DraggableNode from '../DraggableNode/DraggableNode';
import './Toolbar.css';

// Node types for the toolbar - maps to registry types
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
  // New nodes
  {
    type: 'timer',
    label: 'Timer',
    icon: <FiClock size={20} />,
    description: 'Delay or schedule execution',
    category: 'Utilities'
  },
  {
    type: 'filter',
    label: 'Filter',
    icon: <FiFilter size={20} />,
    description: 'Filter data based on conditions',
    category: 'Data'
  },
  {
    type: 'loop',
    label: 'Loop',
    icon: <FiRepeat size={20} />,
    description: 'Iteration and looping control',
    category: 'Logic'
  },
  {
    type: 'webhook',
    label: 'Webhook',
    icon: <FiLink size={20} />,
    description: 'Webhook triggers and receivers',
    category: 'API'
  },
  {
    type: 'database',
    label: 'Database',
    icon: <FiDatabase size={20} />,
    description: 'Database operations',
    category: 'Data'
  },
];

const categoryOrder = ['Inputs', 'Outputs', 'AI', 'Data', 'Logic', 'API', 'Utilities'];

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