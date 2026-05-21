import React from 'react'

const ERROR_ICONS = {
  not_found: '🔍',
  rate_limit: '⏱',
  network: '📡',
  validation: '✏️',
  server: '🔥',
}

const ERROR_TITLES = {
  not_found: 'User Not Found',
  rate_limit: 'Rate Limit Exceeded',
  network: 'Connection Error',
  validation: 'Invalid Input',
  server: 'Server Error',
}

/**
 * Displays a normalized API error with an optional retry button.
 */
const ErrorCard = ({ error, onRetry }) => {
  if (!error) return null

  const icon = ERROR_ICONS[error.type] || '❌'
  const title = ERROR_TITLES[error.type] || 'Something went wrong'

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex flex-col items-center text-center gap-3">
        <span className="text-4xl">{icon}</span>
        <div>
          <h3 className="font-display font-semibold text-lg text-zinc-800 dark:text-zinc-200">
            {title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed">
            {error.message}
          </p>
        </div>
        {onRetry && error.type !== 'validation' && (
          <button onClick={onRetry} className="btn-secondary mt-1">
            ↺ Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorCard
