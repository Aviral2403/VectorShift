import { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary caught error:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback">
          <div className="error-boundary-content">
            <h3 className="error-boundary-title">Something went wrong</h3>
            <p className="error-boundary-message">
              The workflow builder encountered an unexpected error. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="error-boundary-button"
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && this.state.error && (
              <details className="error-boundary-details">
                <summary className="error-boundary-summary">
                  Error Details (Development)
                </summary>
                <pre className="error-boundary-pre">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;