import { useRef, useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Panel,
  ConnectionMode,
  ControlButton
} from 'reactflow';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { useNodes, useEdges, useGetNextNodeID, useAddNode, useOnNodesChange, useOnEdgesChange, useOnConnect } from '../store/store';
import 'reactflow/dist/style.css';
import './PipelineUI.css';

// Existing nodes
import InputNode from '../nodes/InputNode';
import OutputNode from '../nodes/OutputNode';
import LLMNode from '../nodes/LLMNode';
import TextNode from '../nodes/TextNode';
import ConditionalNode from '../nodes/ConditionalNode';
import MathNode from '../nodes/MathNode';
import ApiNode from '../nodes/ApiNode';
import DataTransformNode from '../nodes/DataTransformNode';
import MergeNode from '../nodes/MergeNode';

// New nodes
import TimerNode from '../nodes/TimerNode';
import FilterNode from '../nodes/FilterNode';
import LoopNode from '../nodes/LoopNode';
import WebhookNode from '../nodes/WebhookNode';
import DatabaseNode from '../nodes/DatabaseNode';

import SubmitButton from '../components/SubmitButton/SubmitButton';

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  conditional: ConditionalNode,
  math: MathNode,
  api: ApiNode,
  dataTransform: DataTransformNode,
  merge: MergeNode,
  // New nodes
  timer: TimerNode,
  filter: FilterNode,
  loop: LoopNode,
  webhook: WebhookNode,
  database: DatabaseNode,
};

// Node type to color mapping
const getNodeColor = (nodeType) => {
  const colorMap = {
    customInput: '#10b981',
    customOutput: '#ef4444',
    llm: '#3b82f6',
    text: '#8b5cf6',
    conditional: '#f59e0b',
    math: '#10b981',
    api: '#6366f1',
    dataTransform: '#a855f7',
    merge: '#64748b',
    // New nodes
    timer: '#64748b',
    filter: '#06b6d4',
    loop: '#f59e0b',
    webhook: '#6366f1',
    database: '#06b6d4',
  };
  return colorMap[nodeType] || '#6366f1';
};

const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [fitViewOnLoad, setFitViewOnLoad] = useState(true);

  const nodes = useNodes();
  const edges = useEdges();
  const getNextNodeID = useGetNextNodeID();
  const addNode = useAddNode();
  const onNodesChange = useOnNodesChange();
  const onEdgesChange = useOnEdgesChange();
  const onConnect = useOnConnect();

  // Create styled edges based on source node type
  const styledEdges = edges.map(edge => {
    const sourceNode = nodes.find(node => node.id === edge.source);
    const sourceNodeType = sourceNode?.type;
    const color = getNodeColor(sourceNodeType);

    return {
      ...edge,
      style: {
        stroke: color,
        strokeWidth: 2
      },
      animated: true,
    };
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = event?.dataTransfer?.getData('application/reactflow');

      if (appData) {
        try {
          const { nodeType } = JSON.parse(appData);
          if (!nodeType) return;

          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });

          const nodeID = getNextNodeID(nodeType);
          const newNode = {
            id: nodeID,
            type: nodeType,
            position,
            data: {
              id: nodeID,
              nodeType: nodeType,
              ...(nodeType === 'text' && { text: '{{input}}' })
            },
          };

          addNode(newNode);
        } catch (error) {
          console.error('Error handling node drop:', error);
        }
      }
    },
    [reactFlowInstance, getNextNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <ErrorBoundary>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={styledEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={[20, 20]}
          connectionMode={ConnectionMode.Loose}
          fitView={fitViewOnLoad}
          attributionPosition="top-right"
          minZoom={0.1}
          maxZoom={2}
          defaultEdgeOptions={{
            style: { stroke: '#6366f1', strokeWidth: 2 },
            animated: true,
          }}
        >
          <Background color="#333" gap={20} variant="dots" />

          <Controls position="top-right">
          </Controls>

          <MiniMap
            nodeColor={(n) => {
              return getNodeColor(n.type);
            }}
            nodeStrokeWidth={3}
            zoomable
            pannable
            position="bottom-right"
            style={{
              backgroundColor: 'var(--bg-darker)',
              border: '1px solid var(--card-border)',
              bottom: '1rem',
              right: '1rem',
            }}
          />

        </ReactFlow>
      </div>
    </ErrorBoundary>
  );
};

export default PipelineUI;