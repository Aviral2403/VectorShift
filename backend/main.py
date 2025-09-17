from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request validation
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str
    targetHandle: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: PipelineRequest):
    try:
        # Create a directed graph
        graph = nx.DiGraph()
        
        # Add nodes to the graph
        for node in pipeline.nodes:
            graph.add_node(node.id)
        
        # Validate and add edges
        for edge in pipeline.edges:
            # Check if source and target nodes exist
            if edge.source not in graph or edge.target not in graph:
                raise ValueError(
                    f"Invalid edge: Node {edge.source} or {edge.target} not found"
                )
            # Add the directed edge
            graph.add_edge(edge.source, edge.target)
        
        # Detect cycles
        cycles = list(nx.simple_cycles(graph))
        print(f"Debug - Detected cycles: {cycles}")
        
        # Calculate graph metrics
        is_dag = nx.is_directed_acyclic_graph(graph)
        
        return {
            "num_nodes": len(pipeline.nodes),
            "num_edges": len(pipeline.edges),
            "is_dag": is_dag,
            "cycles_found": cycles if not is_dag else []
        }
        
    except Exception as e:
        print(f"Error processing pipeline: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Pipeline analysis failed: {str(e)}"
        )

@app.get("/")
async def health_check():
    return {
        "status": "healthy",
        "message": "VectorShift Pipeline Analysis Service is running"
    }

@app.get("/test-cycle")
async def test_cycle_detection():
    """Test endpoint to verify cycle detection works"""
    test_graph = nx.DiGraph()
    test_graph.add_edges_from([
        ("conditional-1", "llm-1"),
        ("llm-1", "transform-1"),
        ("transform-1", "conditional-1")  # This creates a cycle
    ])
    
    return {
        "is_dag": nx.is_directed_acyclic_graph(test_graph),
        "cycles": list(nx.simple_cycles(test_graph))
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)