import axios from 'axios'

const BASE_URL = 'https://api.github.com'
const TIMEOUT_MS = 10000

// Build headers - add token if provided in env to increase rate limit
const buildHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
  }
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

// Create axios instance with default config
const githubClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: buildHeaders(),
})

// Response interceptor: normalize errors into a consistent shape
githubClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      // Timeout or network failure
      return Promise.reject({
        type: 'network',
        message: 'Request timed out or network is unavailable. Check your connection and try again.',
      })
    }

    if (!error.response) {
      return Promise.reject({
        type: 'network',
        message: 'Unable to reach GitHub. Check your internet connection.',
      })
    }

    const status = error.response.status

    if (status === 404) {
      return Promise.reject({
        type: 'not_found',
        message: 'GitHub user not found. Double-check the username and try again.',
      })
    }

    if (status === 403) {
      const rateLimitReset = error.response.headers['x-ratelimit-reset']
      const resetTime = rateLimitReset
        ? new Date(rateLimitReset * 1000).toLocaleTimeString()
        : 'soon'
      return Promise.reject({
        type: 'rate_limit',
        message: `GitHub API rate limit exceeded. Resets at ${resetTime}. Add a VITE_GITHUB_TOKEN to your .env for higher limits.`,
      })
    }

    if (status === 422) {
      return Promise.reject({
        type: 'validation',
        message: 'Invalid request. The username may contain invalid characters.',
      })
    }

    return Promise.reject({
      type: 'server',
      message: `GitHub returned an error (${status}). Please try again later.`,
    })
  }
)

/**
 * Fetch a single GitHub user profile.
 * @param {string} username
 */
export const fetchUser = async (username) => {
  const { data } = await githubClient.get(`/users/${username}`)
  return data
}

/**
 * Fetch repos for a user (up to 100, sorted by stars desc).
 * @param {string} username
 */
export const fetchRepos = async (username) => {
  const { data } = await githubClient.get(`/users/${username}/repos`, {
    params: {
      per_page: 100,
      sort: 'pushed',
    },
  })
  return data
}

/**
 * Fetch both user profile and repos together.
 * Returns { user, repos, languages }
 */
export const fetchUserData = async (username) => {
  // Run both requests in parallel for speed
  const [user, repos] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
  ])

  // Aggregate language byte counts across all repos
  const languageMap = {}
  repos.forEach((repo) => {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1
    }
  })

  // Sort languages by frequency
  const languages = Object.entries(languageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }))

  // Top repos sorted by stars
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)

  return { user, repos, topRepos, languages }
}
