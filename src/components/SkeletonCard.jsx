import React from 'react'

/**
 * Skeleton placeholder shown while profile data is loading.
 * Mimics the real profile card layout to reduce layout shift.
 */
const SkeletonCard = () => {
  return (
    <div className="card p-6 animate-pulse-slow">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="skeleton w-20 h-20 rounded-full shrink-0" />
        <div className="flex-1 space-y-2 pt-2">
          <div className="skeleton h-5 w-40 rounded-lg" />
          <div className="skeleton h-4 w-28 rounded-lg" />
          <div className="skeleton h-3 w-56 rounded-lg mt-1" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 space-y-1.5">
            <div className="skeleton h-5 w-12 rounded-md mx-auto" />
            <div className="skeleton h-3 w-16 rounded-md mx-auto" />
          </div>
        ))}
      </div>

      {/* Repo list */}
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 space-y-2">
            <div className="skeleton h-4 w-48 rounded-md" />
            <div className="skeleton h-3 w-full rounded-md" />
            <div className="skeleton h-3 w-2/3 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonCard
