# VectorShift Pipeline Builder

A production-grade pipeline builder developed for VectorShift (YC23) technical assessment. Built with React (Vite) frontend and FastAPI backend, enabling users to visually create, connect, and validate node-based workflows.

---

## Assessment Overview

This project addresses four key tasks:

| Task | Description |
|------|-------------|
| **Node Abstraction** | Factory pattern with centralized registry for rapid node creation |
| **Styling** | Clean, unified design with CSS variables and responsive layouts |
| **Text Node Logic** | Auto-resize textarea + dynamic handles from `{{variable}}` syntax |
| **Backend Integration** | Pipeline validation, node/edge counting, and DAG cycle detection |

---

## Features

- **14 Node Types** - Input, Output, LLM, Text, Conditional, Math, API, Transform, Merge, Timer, Filter, Loop, Webhook, Database
- **Factory Pattern** - Each node file is just 9 lines of code
- **Dynamic Handles** - Text nodes auto-generate input handles from `{{variable}}` syntax
- **Auto-resize Textarea** - Text input expands as you type
- **DAG Validation** - Backend validates pipeline structure and detects cycles
- **Responsive Design** - Works on desktop and mobile with collapsible sidebar
- **Single Source of Truth** - Zustand store for state, nodeRegistry for configuration

---

## Tech Stack

| Frontend | Backend |
|----------|---------|
| React 19 + Vite 7 | FastAPI |
| Zustand (state management) | NetworkX (graph/DAG) |
| React Flow (canvas) | Pydantic (validation) |
| react-icons | Uvicorn (server) |
| react-hot-toast | Python 3.11+ |

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/VectorShift.git
cd Vector-Shift
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs at: `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## Project Structure

```
Vector-Shift/
├── backend/
│   ├── __pycache__/
│   ├── venv/
│   ├── __init__.py
│   ├── main.py                      # FastAPI endpoints
│   └── requirements.txt
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── config/
│   │   │   └── nodeRegistry.js      # Single source of truth for all nodes
│   │   │
│   │   ├── components/
│   │   │   ├── BaseNode/
│   │   │   │   ├── BaseNode.css     # Node styling (CSS variables)
│   │   │   │   ├── BaseNode.jsx     # Base component with colors
│   │   │   │   └── createNode.jsx   # Factory function
│   │   │   ├── DraggableNode/
│   │   │   │   ├── DraggableNode.css
│   │   │   │   └── DraggableNode.jsx
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.css
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   ├── FormComponents/
│   │   │   │   ├── FormComponents.css
│   │   │   │   └── FormComponents.jsx  # Reusable form elements
│   │   │   ├── SubmitButton/
│   │   │   │   ├── SubmitButton.css
│   │   │   │   └── SubmitButton.jsx
│   │   │   └── Toolbar/
│   │   │       ├── Toolbar.css
│   │   │       └── Toolbar.jsx
│   │   │
│   │   ├── nodes/                   # All 14 node files (9 lines each)
│   │   │   ├── ApiNode.jsx
│   │   │   ├── ConditionalNode.jsx
│   │   │   ├── DatabaseNode.jsx     # NEW
│   │   │   ├── DataTransformNode.jsx
│   │   │   ├── FilterNode.jsx       # NEW
│   │   │   ├── InputNode.jsx
│   │   │   ├── LLMNode.jsx
│   │   │   ├── LoopNode.jsx         # NEW
│   │   │   ├── MathNode.jsx
│   │   │   ├── MergeNode.jsx
│   │   │   ├── OutputNode.jsx
│   │   │   ├── TextNode.jsx
│   │   │   ├── TimerNode.jsx        # NEW
│   │   │   └── WebhookNode.jsx      # NEW
│   │   │
│   │   ├── store/
│   │   │   └── store.js             # Zustand store
│   │   │
│   │   ├── ui/
│   │   │   ├── PipelineUI.css
│   │   │   └── PipelineUI.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── handleUtils.js       # Dynamic handle generation
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
└── README.md
```

---

## Node Types

| Category | Nodes | Description |
|----------|-------|-------------|
| **Inputs** | Input | Starting point for workflow data |
| **Outputs** | Output | Final output destination |
| **AI** | LLM | Large Language Model processing (GPT-4, Claude) |
| **Data** | Text, Transform, Filter, Merge, Database | Data manipulation and storage |
| **Logic** | Conditional, Math, Loop | Branching, calculations, iteration |
| **API** | API, Webhook | HTTP requests and triggers |
| **Utilities** | Timer | Delay and scheduling |

---

## Node Abstraction Pattern

All nodes use a factory pattern for consistency and maintainability:

### Each Node File (9 lines)
```javascript
/**
 * InputNode - Starting point for workflow data
 * Generated from node registry using factory function
 */
import { createNodeComponent } from '../components/BaseNode/createNode';

const InputNode = createNodeComponent('input');

export default InputNode;
```

### Configuration in nodeRegistry.js
```javascript
export const NODE_REGISTRY = {
  input: {
    title: 'Input',
    Icon: FiDownload,
    description: 'Starting point for your workflow...',
    category: 'Inputs',
    colors: { bg: '...', border: '...', handle: '...' },
    handles: [{ id: 'value', type: 'source', position: Position.Right }],
    fields: [
      { name: 'inputName', type: 'input', label: 'Name', ... },
      { name: 'inputType', type: 'select', label: 'Type', options: [...] }
    ]
  },
  // ... 13 more node configurations
};
```

---

## API Documentation

The backend exposes APIs to analyze and validate pipelines using NetworkX.

### 1. Health Check
```
GET /
```
**Response:**
```json
{
  "status": "healthy",
  "message": "VectorShift Pipeline Analysis Service is running"
}
```

### 2. Parse Pipeline
```
POST /pipelines/parse
```
**Description:**
- Validates connections between nodes
- Counts nodes and edges
- Detects cycles (DAG validation)

**Request Body:**
```json
{
  "nodes": [
    { "id": "input-1", "type": "InputNode", "position": { "x": 0, "y": 0 }, "data": {} },
    { "id": "llm-1", "type": "LLMNode", "position": { "x": 200, "y": 100 }, "data": {} }
  ],
  "edges": [
    { "id": "edge-1", "source": "input-1", "target": "llm-1", "sourceHandle": "output", "targetHandle": "input" }
  ]
}
```

**Success Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true,
  "cycles_found": []
}
```

**Error Response:**
```json
{
  "detail": "Pipeline analysis failed: Invalid edge: Node input-999 or llm-1 not found"
}
```

### 3. Test Cycle Detection
```
GET /test-cycle
```
**Response:**
```json
{
  "is_dag": false,
  "cycles": [["conditional-1", "llm-1", "transform-1"]]
}
```

---

## Best Practices Implemented

| Practice | Implementation |
|----------|----------------|
| **DRY** | Factory pattern eliminates code duplication |
| **Single Source of Truth** | Zustand store + nodeRegistry.js |
| **No Anti-patterns** | No unnecessary `useState` or `useEffect` in nodes |
| **Performance** | `useMemo`, `useCallback`, `React.memo` |
| **Responsive** | CSS variables + media queries |
| **Clean Architecture** | Separation of concerns (config, components, store) |

---

## The Final Result

Users can:
- Create and connect nodes visually on the canvas
- Drag nodes from a categorized sidebar
- Configure node properties via forms
- Use `{{variable}}` syntax in Text nodes for dynamic inputs
- Submit pipelines to backend for validation
- Receive instant feedback via toast notifications

---

## License

MIT
