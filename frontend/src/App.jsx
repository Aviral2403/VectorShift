import { useState } from 'react';
import PipelineUI from './ui/PipelineUI';
import PipelineToolbar from './components/Toolbar/Toolbar';
import SubmitButton from './components/SubmitButton/SubmitButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { FiMenu, FiX } from 'react-icons/fi';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ErrorBoundary>
      <div className="app-container">
        <button 
          className={`sidebar-toggle ${!sidebarCollapsed ? 'expanded' : ''}`}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </button>
        
        <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <PipelineToolbar collapsed={sidebarCollapsed} />
        </div>
        
        <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <PipelineUI />
        </div>
        
        <div className={`run-workflow-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <SubmitButton />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;