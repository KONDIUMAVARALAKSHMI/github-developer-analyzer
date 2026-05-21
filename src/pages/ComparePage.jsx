import React, { useRef } from 'react'
import SearchBar from '../components/SearchBar'
import UserProfile from '../components/UserProfile'
import SkeletonCard from '../components/SkeletonCard'
import ErrorCard from '../components/ErrorCard'
import { useGitHubUser } from '../hooks/useGitHubUser'
import { formatNumber, getLanguageColor } from '../utils/validate'

const ComparePage = () => {
  const left = useGitHubUser()
  const right = useGitHubUser()
  const leftQuery = useRef('')
  const rightQuery = useRef('')

  const handleLeft = (u) => { leftQuery.current = u; left.search(u) }
  const handleRight = (u) => { rightQuery.current = u; right.search(u) }

  const bothLoaded = left.data && right.data

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-100 mb-2">
          Compare Developers
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
          Search two GitHub usernames to compare their stats side-by-side.
        </p>
      </div>

      {/* Search bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">
            Developer A
          </label>
          <SearchBar onSearch={handleLeft} loading={left.loading} placeholder="First username..." />
        </div>
        <div>
          <label className="block text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">
            Developer B
          </label>
          <SearchBar onSearch={handleRight} loading={right.loading} placeholder="Second username..." />
        </div>
      </div>

      {/* Stat comparison banner (shown when both loaded) */}
      {bothLoaded && (
        <ComparisonBanner left={left.data} right={right.data} />
      )}

      {/* Side-by-side profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          {left.loading && <SkeletonCard />}
          {!left.loading && left.error && (
            <ErrorCard error={left.error} onRetry={() => left.search(leftQuery.current)} />
          )}
          {!left.loading && !left.error && left.data && (
            <UserProfile data={left.data} />
          )}
        </div>
        <div>
          {right.loading && <SkeletonCard />}
          {!right.loading && right.error && (
            <ErrorCard error={right.error} onRetry={() => right.search(rightQuery.current)} />
          )}
          {!right.loading && !right.error && right.data && (
            <UserProfile data={right.data} />
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Shows a highlighted comparison of key stats between two users.
 */
const ComparisonBanner = ({ left, right }) => {
  const lu = left.user
  const ru = right.user

  const metrics = [
    { label: 'Repos', l: lu.public_repos, r: ru.public_repos },
    { label: 'Followers', l: lu.followers, r: ru.followers },
    { label: 'Following', l: lu.following, r: ru.following },
    { label: 'Stars earned', l: left.repos.reduce((s, r) => s + r.stargazers_count, 0), r: right.repos.reduce((s, r) => s + r.stargazers_count, 0) },
    { label: 'Forks earned', l: left.repos.reduce((s, r) => s + r.forks_count, 0), r: right.repos.reduce((s, r) => s + r.forks_count, 0) },
  ]

  return (
    <div className="card p-5 animate-slide-up">
      <h3 className="text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
        Head to Head
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {metrics.map(({ label, l, r }) => {
          const lWins = l > r
          const rWins = r > l
          return (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className={`font-display font-bold text-base ${lWins ? 'text-brand-600 dark:text-brand-400' : 'text-zinc-400 dark:text-zinc-600'}`}>
                  {formatNumber(l)}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700 text-xs">vs</span>
                <span className={`font-display font-bold text-base ${rWins ? 'text-brand-600 dark:text-brand-400' : 'text-zinc-400 dark:text-zinc-600'}`}>
                  {formatNumber(r)}
                </span>
              </div>
              <div className="text-xs text-zinc-400 dark:text-zinc-500">{label}</div>
            </div>
          )
        })}
      </div>

      {/* Language overlap */}
      <LanguageOverlap left={left} right={right} />
    </div>
  )
}

const LanguageOverlap = ({ left, right }) => {
  const leftLangs = new Set(left.languages.map((l) => l.name))
  const rightLangs = new Set(right.languages.map((l) => l.name))
  const shared = [...leftLangs].filter((l) => rightLangs.has(l))

  if (shared.length === 0) return null

  return (
    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
        Shared languages ({shared.length})
      </p>
      <div className="flex flex-wrap gap-2">
        {shared.map((lang) => (
          <span
            key={lang}
            className="tag text-white text-[10px]"
            style={{ backgroundColor: getLanguageColor(lang) }}
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ComparePage
