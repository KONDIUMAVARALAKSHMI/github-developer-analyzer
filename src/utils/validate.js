/**
 * Validates a GitHub username before sending a request.
 * GitHub usernames: max 39 chars, alphanumeric + hyphens, no leading/trailing hyphen.
 * Returns an error string if invalid, null if valid.
 */
export const validateUsername = (username) => {
  if (!username || username.trim().length === 0) {
    return 'Please enter a GitHub username.'
  }

  const trimmed = username.trim()

  if (trimmed.length > 39) {
    return 'GitHub usernames cannot exceed 39 characters.'
  }

  // GitHub username rules: only alphanumeric and hyphens, no consecutive hyphens
  const validPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$|^[a-zA-Z0-9]$/
  if (!validPattern.test(trimmed)) {
    return 'Invalid username format. Only letters, numbers, and single hyphens are allowed.'
  }

  return null
}

/**
 * Formats large numbers with K/M suffix.
 */
export const formatNumber = (num) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return String(num)
}

/**
 * Returns a human-readable time since a date string.
 */
export const timeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]

  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s)
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

/**
 * Language colors (subset, matching GitHub's palette).
 */
export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Scala: '#c22d40',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Lua: '#000080',
  R: '#198ce7',
  MATLAB: '#e16737',
}

export const getLanguageColor = (lang) =>
  LANGUAGE_COLORS[lang] || '#8b949e'
