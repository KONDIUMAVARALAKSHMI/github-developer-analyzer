import React, { useRef } from 'react'
import SearchBar from '../components/SearchBar'
import UserProfile from '../components/UserProfile'
import SkeletonCard from '../components/SkeletonCard'
import ErrorCard from '../components/ErrorCard'
import { useGitHubUser } from '../hooks/useGitHubUser'

const SearchPage = () => {
  const { data, loading, error, search } = useGitHubUser()
  const lastQuery = useRef('')

  const handleSearch = (username) => {
    lastQuery.current = username
    search(username)
  }

  const handleRetry = () => {
    if (lastQuery.current) {
      search(lastQuery.current)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-100 mb-2">
          GitHub Developer Analyzer
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
          Search any GitHub username to explore their profile, repositories, and language stats.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />

      <div className="mt-6">
        {loading && <SkeletonCard />}
        {!loading && error && <ErrorCard error={error} onRetry={handleRetry} />}
        {!loading && !error && data && <UserProfile data={data} />}
        {!loading && !error && !data && <EmptyState />}
      </div>
    </div>
  )
}

const EmptyState = () => (
  <div className="text-center py-16 text-zinc-400 dark:text-zinc-600">
    <div className="text-6xl mb-4">👨‍💻</div>
    <p className="font-display text-lg font-medium text-zinc-500 dark:text-zinc-500">
      Enter a GitHub username above
    </p>
    <p className="text-sm mt-1">
      Try searching for <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400">torvalds</code> or <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400">gaearon</code>
    </p>
  </div>
)

export default SearchPage
