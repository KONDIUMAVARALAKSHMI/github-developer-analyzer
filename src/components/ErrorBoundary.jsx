import React from 'react'

/**
 * Catches unexpected runtime errors so the whole app doesn't crash.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="card p-8 max-w-md w-full text-center">
            <div className="text-5xl mb-4">💥</div>
            <h2 className="text-xl font-bold font-display mb-2">Something went wrong</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
              An unexpected error occurred. Please refresh the page.
            </p>
            <pre className="text-xs text-left bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg overflow-auto mb-6 text-red-500">
              {this.state.error?.message}
            </pre>
            <button
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
