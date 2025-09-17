import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  
  getNextNodeID: (type) => {
    const current = get().nodeIDs[type] || 0;
    return `${type}-${current + 1}`;
  },
  
  incrementNodeID: (type) => {
    const newIDs = {...get().nodeIDs};
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({nodeIDs: newIDs});
  },
  
  addNode: (node) => {
    const { incrementNodeID } = get();
    const nodeType = node.type || node.id.split('-')[0];
    incrementNodeID(nodeType);
    
    set({
      nodes: [...get().nodes, node]
    });
  },
  
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  onConnect: (connection) => {
    set({
      edges: addEdge({
        ...connection,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          height: 20,
          width: 20
        },
        style: {
          stroke: '#94a3b8',
          strokeWidth: 2
        }
      }, get().edges),
    });
  },
  
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          if (node.data[fieldName] !== fieldValue) {
            return {
              ...node,
              data: {
                ...node.data,
                [fieldName]: fieldValue
              }
            };
          }
        }
        return node;
      }),
    });
  },
}));

export const useNodes = () => useStore(state => state.nodes, shallow);
export const useEdges = () => useStore(state => state.edges, shallow);

export const useGetNextNodeID = () => useStore(state => state.getNextNodeID);
export const useAddNode = () => useStore(state => state.addNode);
export const useOnNodesChange = () => useStore(state => state.onNodesChange);
export const useOnEdgesChange = () => useStore(state => state.onEdgesChange);
export const useOnConnect = () => useStore(state => state.onConnect);
export const useUpdateNodeField = () => useStore(state => state.updateNodeField);

export const useStoreActions = () => {
  const getNextNodeID = useGetNextNodeID();
  const addNode = useAddNode();
  const onNodesChange = useOnNodesChange();
  const onEdgesChange = useOnEdgesChange();
  const onConnect = useOnConnect();
  const updateNodeField = useUpdateNodeField();
  
  return {
    getNextNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeField
  };
};