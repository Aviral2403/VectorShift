// src/utils/handleUtils.js
import { Position } from 'reactflow';

// Extract variables from template text
export const extractVariables = (text) => {
  if (!text) return [];

  const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const varName = match[1];
    if (!matches.includes(varName)) {
      matches.push(varName);
    }
  }

  return matches;
};

// Generate handles based on node type and data
export const generateNodeHandles = (nodeType, data = {}) => {
  switch (nodeType) {
    case 'input':
      return [
        { id: 'value', type: 'source', position: Position.Right }
      ];

    case 'output':
      return [
        { id: 'value', type: 'target', position: Position.Left }
      ];

    case 'text': {
      const variables = extractVariables(data.text || '');
      const inputHandles = variables.map((varName, index) => ({
        id: varName,
        type: 'target',
        position: Position.Left,
        style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` }
      }));

      const outputHandles = [
        { id: 'output', type: 'source', position: Position.Right }
      ];

      return [...inputHandles, ...outputHandles];
    }

    case 'llm':
      return [
        { id: 'system', type: 'target', position: Position.Left, style: { top: '30%' } },
        { id: 'prompt', type: 'target', position: Position.Left, style: { top: '70%' } },
        { id: 'response', type: 'source', position: Position.Right }
      ];

    case 'math':
      return [
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'output', type: 'source', position: Position.Right }
      ];

    case 'conditional':
      return [
        { id: 'input', type: 'target', position: Position.Left, style: { top: '50%' } },
        { id: 'true', type: 'source', position: Position.Right, style: { top: '30%' } },
        { id: 'false', type: 'source', position: Position.Right, style: { top: '70%' } }
      ];

    case 'api':
      return [
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'response', type: 'source', position: Position.Right }
      ];

    case 'transform':
      return [
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'output', type: 'source', position: Position.Right }
      ];

    case 'merge':
      return [
        { id: 'input1', type: 'target', position: Position.Left, style: { top: '30%' } },
        { id: 'input2', type: 'target', position: Position.Left, style: { top: '70%' } },
        { id: 'output', type: 'source', position: Position.Right }
      ];


    case 'timer':
      return [
        { id: 'trigger', type: 'target', position: Position.Left },
        { id: 'output', type: 'source', position: Position.Right }
      ];

    case 'filter':
      return [
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'passed', type: 'source', position: Position.Right, style: { top: '30%' } },
        { id: 'rejected', type: 'source', position: Position.Right, style: { top: '70%' } }
      ];

    case 'loop':
      return [
        { id: 'items', type: 'target', position: Position.Left, style: { top: '30%' } },
        { id: 'control', type: 'target', position: Position.Left, style: { top: '70%' } },
        { id: 'current', type: 'source', position: Position.Right, style: { top: '30%' } },
        { id: 'complete', type: 'source', position: Position.Right, style: { top: '70%' } }
      ];

    case 'webhook':
      return [
        { id: 'payload', type: 'source', position: Position.Right }
      ];

    case 'database':
      return [
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'result', type: 'source', position: Position.Right }
      ];

    default:
      return [
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'output', type: 'source', position: Position.Right }
      ];
  }
};

// Get node configuration including handles
export const getNodeConfig = (nodeType, data = {}) => {
  const handles = generateNodeHandles(nodeType, data);

  return {
    handles,
    nodeType,
    data: {
      ...data,
      nodeType
    }
  };
};