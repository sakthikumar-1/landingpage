import { Component } from 'react';

/**
 * Catches any unexpected runtime or WebGL render errors and prevents
 * the entire React tree from crashing to an unstyled or blank page.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App runtime error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#040406] px-6 text-center text-[#ffffff]">
          <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-[#f0c465] sm:text-3xl">
            Sakthi Kumar
          </h1>
          <p className="mt-3 max-w-md font-sans text-sm text-[#b8b9c2]">
            An unexpected error interrupted the visual experience. Click below to reload.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-6 rounded-full border border-[rgba(240,196,101,0.4)] bg-[rgba(240,196,101,0.12)] px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-[#f0c465] transition-colors hover:bg-[#f0c465] hover:text-[#040406]"
          >
            Reload Experience
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

