# 📌 Introduction

This project was developed as part of a technical assessment for VectorShift (YC23).
It consists of a React (Vite) frontend and a FastAPI backend, working together to allow users to build, style, and validate node-based pipelines.

### The assessment was divided into four key tasks:

- **Node Abstraction –** Create a reusable abstraction to streamline building new nodes and demonstrate it by implementing five custom nodes.

- **Styling –** Apply a clean, unified design across all frontend components.

- **Text Node Logic –**  Enhance the Text node to auto-resize with input and dynamically generate variable handles ({{variable}}).

- **Backend Integration –** Connect the frontend to a FastAPI backend that validates pipelines, counts nodes/edges, and checks for cycles (DAG validation).

### The final result enables users to:

- Create and connect nodes visually

- Style and expand the pipeline easily

- Input text with dynamic variables

- Submit pipelines to the backend for validation and receive instant feedback

# ⚙️ Tech Stack

**Frontend**  
- React (with Vite)  
- JavaScript (ES6+)  
- CSS Modules  

**Backend**  
- FastAPI (Python 3.11+)  
- Pydantic  
- Uvicorn 

# 🚀 Getting Started

## 1️) Clone the Repository
```bash
git clone https://github.com/<your-username>/VectorShift.git
cd Vector-Shift
```
## 2) Backend Setup

```
cd backend
python -m venv venv
source venv/bin/activate   # On macOS/Linux
venv\Scripts\activate      # On Windows

pip install -r requirements.txt
uvicorn main:app --reload
```

## 3) Frontend Setup

```
cd ../frontend
npm install
npm run dev
```


# Project Structure

```
Vector-Shift/
├── backend/
│ ├── pycache/
│ ├── venv/
│ ├── init.py
│ ├── main.py
│ └── requirements.txt
│
├── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── BaseNode/
│ │ │ │ ├── BaseNode.css
│ │ │ │ └── BaseNode.jsx
│ │ │ ├── DraggableNode/
│ │ │ │ ├── DraggableNode.css
│ │ │ │ └── DraggableNode.jsx
│ │ │ ├── ErrorBoundary/
│ │ │ │ ├── ErrorBoundary.css
│ │ │ │ └── ErrorBoundary.jsx
│ │ │ ├── SubmitButton/
│ │ │ │ ├── SubmitButton.css
│ │ │ │ └── SubmitButton.jsx
│ │ │ └── Toolbar/
│ │ │ ├── Toolbar.css
│ │ │ └── Toolbar.jsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useNodeField.jsx
│ │ │ ├── useNodeResize.jsx
│ │ │ └── useTemplateVariables.jsx
│ │ │
│ │ ├── nodes/
│ │ │ ├── ApiNode/
│ │ │ │ ├── ApiNode.css
│ │ │ │ └── ApiNode.jsx
│ │ │ ├── ConditionalNode/
│ │ │ │ ├── ConditionalNode.css
│ │ │ │ └── ConditionalNode.jsx
│ │ │ ├── DataTransformNode/
│ │ │ │ ├── DataTransformNode.css
│ │ │ │ └── DataTransformNode.jsx
│ │ │ ├── InputNode/
│ │ │ │ ├── InputNode.css
│ │ │ │ └── InputNode.jsx
│ │ │ ├── LLMNode/
│ │ │ │ ├── LLMNode.css
│ │ │ │ └── LLMNode.jsx
│ │ │ ├── MathNode/
│ │ │ │ ├── MathNode.css
│ │ │ │ └── MathNode.jsx
│ │ │ ├── MergeNode/
│ │ │ │ ├── MergeNode.css
│ │ │ │ └── MergeNode.jsx
│ │ │ ├── OutputNode/
│ │ │ │ ├── OutputNode.css
│ │ │ │ └── OutputNode.jsx
│ │ │ └── TextNode/
│ │ │ ├── TextNode.css
│ │ │ └── TextNode.jsx
│ │ │
│ │ ├── store/
│ │ │ └── store.js
│ │ │
│ │ ├── ui/
│ │ │ ├── PipelineUI.css
│ │ │ └── PipelineUI.jsx
│ │ │
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ │
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ ├── README.md
│ └── vite.config.js
```

## ✨ Features

**Pipeline UI –** Interactive canvas to visualize and connect nodes.

**Node Types –** Support for multiple nodes such as:

- InputNode, OutputNode

- LLMNode (for language model operations)

- MathNode, MergeNode, ConditionalNode

- DataTransformNode, ApiNode, TextNode

**FastAPI Backend –** Provides API endpoints to process pipeline logic.

**Modular Architecture –** Nodes and UI components are separated for scalability.


# 🛠️ API Documentation

The backend exposes a small set of APIs to analyze and validate pipelines (nodes + edges) by leveraging NetworkX (a graph library).

## 1. Health Check

### Endpoint:

GET /


### Description:
Verifies that the backend service is running. Useful for health checks or deployment tests.

### Response:

```
{
  "status": "healthy",
  "message": "VectorShift Pipeline Analysis Service is running"
}
```

## 2. Parse Pipeline

### Endpoint:

POST /pipelines/parse


### Description:
- Analyzes a pipeline (nodes + edges), validates connections, and detects cycles.

- Builds a directed graph (DiGraph) from the provided nodes and edges.

- Ensures all edges connect valid nodes.

- Checks whether the graph is a DAG (Directed Acyclic Graph).

- Detects cycles if present.

### Request Body Example:

```
{
  "nodes": [
    {
      "id": "input-1",
      "type": "InputNode",
      "position": { "x": 0, "y": 0 },
      "data": { "label": "Input Node" }
    },
    {
      "id": "llm-1",
      "type": "LLMNode",
      "position": { "x": 200, "y": 100 },
      "data": { "model": "gpt-4" }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "input-1",
      "target": "llm-1",
      "sourceHandle": "output",
      "targetHandle": "input"
    }
  ]
}
```

### Successful Response Example:

```
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true,
  "cycles_found": []
}
```


### Error Response Example (if invalid edge):

```
{
  "detail": "Pipeline analysis failed: Invalid edge: Node input-999 or llm-1 not found"
}
```

## 3. Test Cycle Detection

### Endpoint:

GET /test-cycle


### Description:
Returns a hardcoded graph with a cycle for quick testing/debugging. Useful for verifying that cycle detection logic works.

### Response Example:

```
{
  "is_dag": false,
  "cycles": [["conditional-1", "llm-1", "transform-1"]]
}
```
