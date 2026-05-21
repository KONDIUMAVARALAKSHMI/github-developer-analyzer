import React, { useState } from 'react'
import { formatNumber, timeAgo, getLanguageColor } from '../utils/validate'

/**
 * Full profile card: avatar, bio, stats, top repos, language bars.
 */
const UserProfile = ({ data }) => {
  const { user, topRepos, languages } = data
  const [avatarError, setAvatarError] = useState(false)

  // Fallback if GitHub avatar fails to load
  const avatarSrc = avatarError
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.login)}&background=0d9488&color=fff&size=128`
    : user.avatar_url

  return (
    <div className="card p-6 animate-slide-up space-y-6">
      {/* Profile header */}
      <div className="flex items-start gap-4">
        <img
          src={avatarSrc}
          alt={`${user.login}'s avatar`}
          onError={() => setAvatarError(true)}
          className="w-20 h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-700 shrink-0 object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-100 truncate">
              {user.name || user.login}
            </h2>
            {user.site_admin && (
              <span className="tag bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                ⭐ Staff
              </span>
            )}
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-mono"
          >
            @{user.login}
          </a>
          {user.bio && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
              {user.bio}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {user.location && <span>📍 {user.location}</span>}
            {user.company && <span>🏢 {user.company}</span>}
            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 truncate max-w-[180px]"
              >
                🔗 {user.blog}
              </a>
            )}
            <span>📅 Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox value={formatNumber(user.public_repos)} label="Repos" />
        <StatBox value={formatNumber(user.followers)} label="Followers" />
        <StatBox value={formatNumber(user.following)} label="Following" />
      </div>

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
            Most Used Languages
          </h3>
          <div className="space-y-2">
            {languages.map(({ name, count }, i) => {
              const total = languages.reduce((s, l) => s + l.count, 0)
              const pct = Math.round((count / total) * 100)
              return (
                <div key={name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-1.5 font-mono font-medium text-zinc-700 dark:text-zinc-300">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: getLanguageColor(name) }}
                      />
                      {name}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: getLanguageColor(name),
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Top repos */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
          Top Repositories
        </h3>
        {topRepos.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">
            This user has no public repositories.
          </p>
        ) : (
          <div className="space-y-2.5">
            {topRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const StatBox = ({ value, label }) => (
  <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-xl p-3 text-center border border-zinc-100 dark:border-zinc-800">
    <div className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-100">{value}</div>
    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{label}</div>
  </div>
)

const RepoCard = ({ repo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 rounded-xl p-3.5 transition-colors duration-200 group"
  >
    <div className="flex items-start justify-between gap-2">
      <span className="font-mono text-sm font-medium text-brand-600 dark:text-brand-400 group-hover:underline truncate">
        {repo.name}
      </span>
      {repo.fork && (
        <span className="tag bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 shrink-0">
          fork
        </span>
      )}
    </div>
    {repo.description && (
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
        {repo.description}
      </p>
    )}
    <div className="flex items-center gap-3 mt-2 text-xs text-zinc-400 dark:text-zinc-500">
      {repo.language && (
        <span className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getLanguageColor(repo.language) }}
          />
          {repo.language}
        </span>
      )}
      <span>⭐ {formatNumber(repo.stargazers_count)}</span>
      <span>🍴 {formatNumber(repo.forks_count)}</span>
      <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
    </div>
  </a>
)

export default UserProfile
