import React, { useState } from 'react'
import { validateUsername } from '../utils/validate'

const SearchBar = ({ onSearch, loading, placeholder = 'Search GitHub username...' }) => {
  const [input, setInput] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validateUsername(input)
    if (err) {
      setValidationError(err)
      return
    }
    setValidationError('')
    onSearch(input.trim())
  }

  const handleChange = (e) => {
    setInput(e.target.value)
    // Clear validation error as user types
    if (validationError) setValidationError('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-lg pointer-events-none">
            @
          </span>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={loading}
            className={`input-field pl-9 ${validationError ? 'ring-2 ring-red-400 border-transparent' : ''}`}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2 shrink-0"
        >
          {loading ? (
            <>
              <Spinner />
              <span className="hidden sm:inline">Searching…</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </div>
      {validationError && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5">
          <span>⚠</span> {validationError}
        </p>
      )}
    </form>
  )
}

const Spinner = () => (
  <svg
    className="animate-spin w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
)

export default SearchBar
