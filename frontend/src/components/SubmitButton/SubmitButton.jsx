// src/components/SubmitButton/SubmitButton.jsx
import { useStore } from '../../store/store';
import './SubmitButton.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useCallback } from 'react';
import { FiLoader, FiCheck, FiX } from 'react-icons/fi';

const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) {
      console.log('Already submitting, ignoring duplicate call');
      return;
    }

    setIsSubmitting(true);

    toast.dismiss();

    console.log("Nodes:", nodes);
    console.log("Edges:", edges);

    const loadingToast = toast.loading(
      <div className="toast-message">
        <span>Analyzing pipeline...</span>
      </div>,
      {
        duration: Infinity,
        style: {
          minWidth: '250px',
        },
      }
    );

    const startTime = Date.now();
    const MIN_LOADING_DURATION = 1500;

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_DURATION - elapsedTime);

      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      toast.dismiss(loadingToast);

      setTimeout(() => {
        toast.success(
          <div className="toast-message">
            <div>
              <div>Pipeline Analysis Complete</div>
              <div className="toast-details">
                <span>Nodes: {data.num_nodes}</span>
                <span>Edges: {data.num_edges}</span>
                <span>DAG: {data.is_dag ? '✓' : '✗'}</span>
              </div>
            </div>
          </div>,
          {
            id: 'success-toast',
            duration: 4000,
            style: {
              minWidth: '300px',
            },
          }
        );
      }, 200);

    } catch (error) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_DURATION - elapsedTime);

      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      toast.dismiss(loadingToast);

      setTimeout(() => {
        toast.error(
          <div className="toast-message">
            <div>
              <div>Analysis Failed</div>
              <div className="toast-error-detail">{error.message}</div>
            </div>
          </div>,
          {
            id: 'error-toast',
            duration: 4000,
          }
        );
      }, 200);
      console.error('Error submitting pipeline:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [nodes, edges, isSubmitting]);

  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          top: 60,
        }}
        toastOptions={{
          className: 'custom-toast',
          style: {
            background: '#1a1a1a',
            color: '#f8f8f8',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#4BB543',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff3333',
              secondary: 'white',
            },
          },
          loading: {
            iconTheme: {
              primary: '#6366f1',
              secondary: 'white',
            },
          },
        }}
      />

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={nodes.length === 0 || isSubmitting}
      >
        {isSubmitting ? (
          <span className="button-content">
            <FiLoader className="button-loader" />
            Analyzing...
          </span>
        ) : (
          'Run Workflow'
        )}
      </button>
    </>
  );
};

export default SubmitButton;