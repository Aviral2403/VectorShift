/**
 * Node Registry - Centralized configuration for all node types
 * FIXED: Dynamic handle positioning for text nodes with multiple variables
 */
import { Position } from 'reactflow';
import {
    FiDownload, FiUpload, FiCpu, FiEdit, FiGitBranch,
    FiZap, FiRotateCw, FiLayers, FiClock, FiFilter,
    FiRepeat, FiLink, FiDatabase, FiDivideCircle
} from 'react-icons/fi';

// Color configurations for each node category
const COLORS = {
    input: {
        bg: 'rgba(16, 185, 129, 0.1)',
        border: 'rgba(16, 185, 129, 0.5)',
        header: 'rgba(16, 185, 129, 0.2)',
        handle: '#10b981',
        hover: '#10b981'
    },
    output: {
        bg: 'rgba(239, 68, 68, 0.1)',
        border: 'rgba(239, 68, 68, 0.5)',
        header: 'rgba(239, 68, 68, 0.2)',
        handle: '#ef4444',
        hover: '#ef4444'
    },
    processing: {
        bg: 'rgba(59, 130, 246, 0.1)',
        border: 'rgba(59, 130, 246, 0.5)',
        header: 'rgba(59, 130, 246, 0.2)',
        handle: '#3b82f6',
        hover: '#3b82f6'
    },
    text: {
        bg: 'rgba(139, 92, 246, 0.1)',
        border: 'rgba(139, 92, 246, 0.3)',
        header: 'rgba(139, 92, 246, 0.2)',
        handle: '#8b5cf6',
        hover: '#8b5cf6'
    },
    logic: {
        bg: 'rgba(245, 158, 11, 0.1)',
        border: 'rgba(245, 158, 11, 0.5)',
        header: 'rgba(245, 158, 11, 0.2)',
        handle: '#f59e0b',
        hover: '#f59e0b'
    },
    api: {
        bg: 'rgba(99, 102, 241, 0.1)',
        border: 'rgba(99, 102, 241, 0.5)',
        header: 'rgba(99, 102, 241, 0.2)',
        handle: '#6366f1',
        hover: '#6366f1'
    },
    transform: {
        bg: 'rgba(168, 85, 247, 0.1)',
        border: 'rgba(168, 85, 247, 0.5)',
        header: 'rgba(168, 85, 247, 0.2)',
        handle: '#a855f7',
        hover: '#a855f7'
    },
    utility: {
        bg: 'rgba(100, 116, 139, 0.1)',
        border: 'rgba(100, 116, 139, 0.5)',
        header: 'rgba(100, 116, 139, 0.2)',
        handle: '#64748b',
        hover: '#64748b'
    },
    data: {
        bg: 'rgba(6, 182, 212, 0.1)',
        border: 'rgba(6, 182, 212, 0.5)',
        header: 'rgba(6, 182, 212, 0.2)',
        handle: '#06b6d4',
        hover: '#06b6d4'
    }
};

// Field type definitions
export const FIELD_TYPES = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea',
    NUMBER: 'number'
};


export const NODE_REGISTRY = {
    // Input Node
    input: {
        title: 'Input',
        Icon: FiDownload,
        description: 'Starting point for your workflow. Defines input parameters that will be processed.',
        category: 'Inputs',
        colors: COLORS.input,
        handles: [
            { id: 'value', type: 'source', position: Position.Right }
        ],
        fields: [
            {
                name: 'inputName',
                type: FIELD_TYPES.INPUT,
                label: 'Name',
                placeholder: 'Input name',
                defaultValue: (id) => id.replace('customInput-', 'input')
            },
            {
                name: 'inputType',
                type: FIELD_TYPES.SELECT,
                label: 'Type',
                defaultValue: 'Text',
                options: [
                    { value: 'Text', label: 'Text' },
                    { value: 'File', label: 'File' },
                    { value: 'Number', label: 'Number' },
                    { value: 'Boolean', label: 'Boolean' }
                ]
            }
        ]
    },

    // Output Node
    output: {
        title: 'Output',
        Icon: FiUpload,
        description: 'Final destination for processed data. Defines how results will be delivered.',
        category: 'Outputs',
        colors: COLORS.output,
        handles: [
            { id: 'value', type: 'target', position: Position.Left }
        ],
        fields: [
            {
                name: 'outputName',
                type: FIELD_TYPES.INPUT,
                label: 'Name',
                placeholder: 'Output name',
                defaultValue: (id) => id.replace('customOutput-', 'output')
            },
            {
                name: 'outputType',
                type: FIELD_TYPES.SELECT,
                label: 'Type',
                defaultValue: 'Text',
                options: [
                    { value: 'Text', label: 'Text' },
                    { value: 'Image', label: 'Image' },
                    { value: 'JSON', label: 'JSON' }
                ]
            }
        ]
    },

    // LLM Node
    llm: {
        title: 'LLM',
        Icon: FiCpu,
        description: 'Large Language Model processor. Configure model parameters and behavior.',
        category: 'AI',
        colors: COLORS.processing,
        handles: [
            { id: 'system', type: 'target', position: Position.Left, style: { top: '30%' } },
            { id: 'prompt', type: 'target', position: Position.Left, style: { top: '70%' } },
            { id: 'response', type: 'source', position: Position.Right }
        ],
        fields: [
            {
                name: 'model',
                type: FIELD_TYPES.SELECT,
                label: 'Model',
                defaultValue: 'gpt-3.5-turbo',
                options: [
                    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
                    { value: 'gpt-4', label: 'GPT-4' },
                    { value: 'claude-2', label: 'Claude 2' }
                ]
            }
        ]
    },

    // Text Node - Special handling for dynamic variables
    text: {
        title: 'Text',
        Icon: FiEdit,
        description: 'Text processing and templating node. Use {{variable}} syntax for dynamic inputs.',
        category: 'Data',
        colors: COLORS.text,
        // Handles are dynamically generated based on text content
        dynamicHandles: true,
        handles: [
            { id: 'output', type: 'source', position: Position.Right, style: { top: '50%', transform: 'translateY(-50%)' } }
        ],
        fields: [
            {
                name: 'text',
                type: FIELD_TYPES.TEXTAREA,
                label: 'Text Content',
                placeholder: 'Enter text with {{variables}}',
                defaultValue: '{{input}}',
                rows: 3,
                autoResize: true
            }
        ]
    },

    // Math Node
    math: {
        title: 'Math',
        Icon: FiDivideCircle,
        description: 'Mathematical operations. Performs calculations on input values.',
        category: 'Logic',
        colors: COLORS.input,
        handles: [
            { id: 'input', type: 'target', position: Position.Left },
            { id: 'output', type: 'source', position: Position.Right }
        ],
        fields: [
            {
                name: 'operation',
                type: FIELD_TYPES.SELECT,
                label: 'Operation',
                defaultValue: 'add',
                options: [
                    { value: 'add', label: 'Add (+)' },
                    { value: 'subtract', label: 'Subtract (-)' },
                    { value: 'multiply', label: 'Multiply (×)' },
                    { value: 'divide', label: 'Divide (÷)' },
                    { value: 'power', label: 'Power (^)' },
                    { value: 'modulo', label: 'Modulo (%)' }
                ]
            },
            {
                name: 'value',
                type: FIELD_TYPES.NUMBER,
                label: 'Value',
                placeholder: 'Number value',
                defaultValue: ''
            }
        ]
    },

    // Conditional Node
    conditional: {
        title: 'Condition',
        Icon: FiGitBranch,
        description: 'Conditional branching. Routes data based on comparison results.',
        category: 'Logic',
        colors: COLORS.logic,
        handles: [
            { id: 'input', type: 'target', position: Position.Left, style: { top: '50%' } },
            { id: 'true', type: 'source', position: Position.Right, style: { top: '30%' } },
            { id: 'false', type: 'source', position: Position.Right, style: { top: '70%' } }
        ],
        fields: [
            {
                name: 'operator',
                type: FIELD_TYPES.SELECT,
                label: 'Operator',
                defaultValue: '==',
                options: [
                    { value: '==', label: 'Equals (==)' },
                    { value: '!=', label: 'Not Equals (!=)' },
                    { value: '>', label: 'Greater Than (>)' },
                    { value: '<', label: 'Less Than (<)' },
                    { value: '>=', label: 'Greater or Equal (>=)' },
                    { value: '<=', label: 'Less or Equal (<=)' },
                    { value: 'contains', label: 'Contains' }
                ]
            },
            {
                name: 'value',
                type: FIELD_TYPES.INPUT,
                label: 'Value',
                placeholder: 'Comparison value',
                defaultValue: ''
            }
        ]
    },

    // API Node
    api: {
        title: 'API',
        Icon: FiZap,
        description: 'API integration. Makes HTTP requests to external services.',
        category: 'API',
        colors: COLORS.api,
        handles: [
            { id: 'input', type: 'target', position: Position.Left },
            { id: 'response', type: 'source', position: Position.Right }
        ],
        fields: [
            {
                name: 'method',
                type: FIELD_TYPES.SELECT,
                label: 'Method',
                defaultValue: 'GET',
                options: [
                    { value: 'GET', label: 'GET' },
                    { value: 'POST', label: 'POST' },
                    { value: 'PUT', label: 'PUT' },
                    { value: 'DELETE', label: 'DELETE' },
                    { value: 'PATCH', label: 'PATCH' }
                ]
            },
            {
                name: 'url',
                type: FIELD_TYPES.INPUT,
                label: 'URL',
                placeholder: 'API endpoint URL',
                defaultValue: 'https://api.example.com'
            }
        ]
    },

    // Transform Node
    transform: {
        title: 'Transform',
        Icon: FiFilter,
        description: 'Data transformation. Manipulates input data according to specified rules.',
        category: 'Data',
        colors: COLORS.transform,
        handles: [
            { id: 'input', type: 'target', position: Position.Left },
            { id: 'output', type: 'source', position: Position.Right }
        ],
        fields: [
            {
                name: 'transformType',
                type: FIELD_TYPES.SELECT,
                label: 'Transform Type',
                defaultValue: 'filter',
                options: [
                    { value: 'filter', label: 'Filter' },
                    { value: 'map', label: 'Map' },
                    { value: 'sort', label: 'Sort' },
                    { value: 'group', label: 'Group' },
                    { value: 'reduce', label: 'Reduce' }
                ]
            },
            {
                name: 'expression',
                type: FIELD_TYPES.TEXTAREA,
                label: 'Expression',
                placeholder: 'JavaScript expression',
                defaultValue: '',
                rows: 2
            }
        ]
    },

    // Merge Node
    merge: {
        title: 'Merge',
        Icon: FiLayers,
        description: 'Combines multiple data streams into a single output.',
        category: 'Data',
        colors: COLORS.utility,
        handles: [
            { id: 'input1', type: 'target', position: Position.Left, style: { top: '30%' } },
            { id: 'input2', type: 'target', position: Position.Left, style: { top: '70%' } },
            { id: 'output', type: 'source', position: Position.Right }
        ],
        fields: [],
        staticContent: 'Combines multiple inputs into a single output stream'
    },

    // Timer Node
    timer: {
        title: 'Timer',
        Icon: FiClock,
        description: 'Delay or schedule execution. Adds time-based control to your workflow.',
        category: 'Utilities',
        colors: COLORS.utility,
        handles: [
            { id: 'trigger', type: 'target', position: Position.Left },
            { id: 'output', type: 'source', position: Position.Right }
        ],
        fields: [
            {
                name: 'delay',
                type: FIELD_TYPES.NUMBER,
                label: 'Delay (ms)',
                placeholder: '1000',
                defaultValue: '1000'
            },
            {
                name: 'mode',
                type: FIELD_TYPES.SELECT,
                label: 'Mode',
                defaultValue: 'delay',
                options: [
                    { value: 'delay', label: 'Delay' },
                    { value: 'debounce', label: 'Debounce' },
                    { value: 'throttle', label: 'Throttle' }
                ]
            }
        ]
    },

    // Filter Node
    filter: {
        title: 'Filter',
        Icon: FiFilter,
        description: 'Filters data based on conditions. Only matching items pass through.',
        category: 'Data',
        colors: COLORS.data,
        handles: [
            { id: 'input', type: 'target', position: Position.Left },
            { id: 'passed', type: 'source', position: Position.Right, style: { top: '30%' } },
            { id: 'rejected', type: 'source', position: Position.Right, style: { top: '70%' } }
        ],
        fields: [
            {
                name: 'field',
                type: FIELD_TYPES.INPUT,
                label: 'Field',
                placeholder: 'Field to filter on',
                defaultValue: ''
            },
            {
                name: 'condition',
                type: FIELD_TYPES.SELECT,
                label: 'Condition',
                defaultValue: 'equals',
                options: [
                    { value: 'equals', label: 'Equals' },
                    { value: 'contains', label: 'Contains' },
                    { value: 'startsWith', label: 'Starts With' },
                    { value: 'endsWith', label: 'Ends With' },
                    { value: 'greaterThan', label: 'Greater Than' },
                    { value: 'lessThan', label: 'Less Than' },
                    { value: 'isEmpty', label: 'Is Empty' },
                    { value: 'isNotEmpty', label: 'Is Not Empty' }
                ]
            },
            {
                name: 'value',
                type: FIELD_TYPES.INPUT,
                label: 'Value',
                placeholder: 'Comparison value',
                defaultValue: ''
            }
        ]
    },

    // Loop Node
    loop: {
        title: 'Loop',
        Icon: FiRepeat,
        description: 'Iteration control. Processes items in a collection one by one.',
        category: 'Logic',
        colors: COLORS.logic,
        handles: [
            { id: 'items', type: 'target', position: Position.Left, style: { top: '30%' } },
            { id: 'control', type: 'target', position: Position.Left, style: { top: '70%' } },
            { id: 'current', type: 'source', position: Position.Right, style: { top: '30%' } },
            { id: 'complete', type: 'source', position: Position.Right, style: { top: '70%' } }
        ],
        fields: [
            {
                name: 'loopType',
                type: FIELD_TYPES.SELECT,
                label: 'Loop Type',
                defaultValue: 'forEach',
                options: [
                    { value: 'forEach', label: 'For Each' },
                    { value: 'times', label: 'Times' },
                    { value: 'while', label: 'While' }
                ]
            },
            {
                name: 'count',
                type: FIELD_TYPES.NUMBER,
                label: 'Count/Limit',
                placeholder: 'Iteration count',
                defaultValue: '10'
            }
        ]
    },

    // Webhook Node
    webhook: {
        title: 'Webhook',
        Icon: FiLink,
        description: 'Webhook trigger. Receives data from external HTTP requests.',
        category: 'API',
        colors: COLORS.api,
        handles: [
            { id: 'payload', type: 'source', position: Position.Right }
        ],
        fields: [
            {
                name: 'path',
                type: FIELD_TYPES.INPUT,
                label: 'Path',
                placeholder: '/webhook/my-endpoint',
                defaultValue: '/webhook'
            },
            {
                name: 'method',
                type: FIELD_TYPES.SELECT,
                label: 'Method',
                defaultValue: 'POST',
                options: [
                    { value: 'GET', label: 'GET' },
                    { value: 'POST', label: 'POST' },
                    { value: 'PUT', label: 'PUT' }
                ]
            },
            {
                name: 'authentication',
                type: FIELD_TYPES.SELECT,
                label: 'Authentication',
                defaultValue: 'none',
                options: [
                    { value: 'none', label: 'None' },
                    { value: 'apiKey', label: 'API Key' },
                    { value: 'bearer', label: 'Bearer Token' }
                ]
            }
        ]
    },

    // Database Node
    database: {
        title: 'Database',
        Icon: FiDatabase,
        description: 'Database operations. Query, insert, update, or delete records.',
        category: 'Data',
        colors: COLORS.data,
        handles: [
            { id: 'input', type: 'target', position: Position.Left },
            { id: 'result', type: 'source', position: Position.Right }
        ],
        fields: [
            {
                name: 'operation',
                type: FIELD_TYPES.SELECT,
                label: 'Operation',
                defaultValue: 'query',
                options: [
                    { value: 'query', label: 'Query' },
                    { value: 'insert', label: 'Insert' },
                    { value: 'update', label: 'Update' },
                    { value: 'delete', label: 'Delete' }
                ]
            },
            {
                name: 'table',
                type: FIELD_TYPES.INPUT,
                label: 'Table/Collection',
                placeholder: 'Table name',
                defaultValue: ''
            },
            {
                name: 'query',
                type: FIELD_TYPES.TEXTAREA,
                label: 'Query/Filter',
                placeholder: 'SQL or filter expression',
                defaultValue: '',
                rows: 2
            }
        ]
    }
};

/**
 * Get node configuration by type
 */
export const getNodeConfig = (nodeType) => {
    const typeMap = {
        customInput: 'input',
        customOutput: 'output',
        dataTransform: 'transform'
    };

    const key = typeMap[nodeType] || nodeType;
    return NODE_REGISTRY[key] || null;
};

/**
 * Get all node types for toolbar
 */
export const getToolbarNodes = () => {
    return Object.entries(NODE_REGISTRY).map(([key, config]) => ({
        type: key === 'input' ? 'customInput' : key === 'output' ? 'customOutput' : key === 'transform' ? 'dataTransform' : key,
        label: config.title,
        Icon: config.Icon,
        description: config.description,
        category: config.category
    }));
};

/**
 * Get handles for a node type
 * For text nodes: simple single input + output handles (variables shown in display only)
 */
export const getNodeHandles = (nodeType, data = {}) => {
    const config = getNodeConfig(nodeType);
    if (!config) return [];

    // For text nodes, use simple centered input/output handles
    // Variables are detected and shown but don't create multiple handles
    if (nodeType === 'text') {
        const text = data.text || '';
        const variables = extractVariablesFromText(text);

        // If no variables, provide a default 'input' handle so the node is usable
        if (variables.length === 0) {
            return [
                {
                    id: 'input',
                    type: 'target',
                    position: Position.Left,
                    style: { top: '50%' }
                },
                {
                    id: 'output',
                    type: 'source',
                    position: Position.Right,
                    style: { top: '50%', transform: 'translateY(-50%)' }
                }
            ];
        }

        // Create an input handle for each variable, stacked vertically
        const variableHandles = variables.map((varName, index) => {
            const totalVars = variables.length;
            let topPercent;

            // Calculate vertical position for proper stacking
            // We use a wide range (10% to 90%) to ensure maximum spacing
            if (totalVars === 1) {
                topPercent = 50;
            } else {
                // Distribute evenly from 10% to 90%
                const startPercent = 10;
                const endPercent = 90;
                const range = endPercent - startPercent;
                topPercent = startPercent + (index * (range / (totalVars - 1)));
            }

            return {
                id: varName, // Handle ID is the variable name
                type: 'target',
                position: Position.Left,
                style: {
                    top: `${topPercent}%`,
                    transform: 'translateY(-50%)'
                }
            };
        });

        // Always add output handle on the right (centered)
        const outputHandle = {
            id: 'output',
            type: 'source',
            position: Position.Right,
            style: { top: '50%', transform: 'translateY(-50%)' }
        };

        return [...variableHandles, outputHandle];
    }

    return config.handles || [];
};

/**
 * Extract variables from text content ({{variable}} syntax)
 */
export const extractVariablesFromText = (text) => {
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

/**
 * Get default field values for a node type
 */
export const getDefaultFieldValues = (nodeType, nodeId) => {
    const config = getNodeConfig(nodeType);
    if (!config) return {};

    const defaults = {};
    config.fields.forEach(field => {
        if (typeof field.defaultValue === 'function') {
            defaults[field.name] = field.defaultValue(nodeId);
        } else {
            defaults[field.name] = field.defaultValue;
        }
    });

    return defaults;
};

export default NODE_REGISTRY;