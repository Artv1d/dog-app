import { Component } from 'react';
import { useAppContext } from '../context/AppContext';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>⚠️ Something went wrong</h2>
          <p>{this.state.error?.message || 'Unknown error'}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
          <p className="api-info">
            Data from <a href="https://dog.ceo/api" target="_blank" rel="noreferrer">Dog API</a>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}