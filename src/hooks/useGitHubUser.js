import { useState, useCallback } from 'react'
import { fetchUserData } from '../services/github'
import { validateUsername } from '../utils/validate'

/**
 * Hook for fetching and managing a single GitHub user's data.
 */
export const useGitHubUser = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (rawUsername) => {
    // Client-side validation before hitting the API
    const validationError = validateUsername(rawUsername)
    if (validationError) {
      setError({ type: 'validation', message: validationError })
      setData(null)
      return
    }

    const username = rawUsername.trim()
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const result = await fetchUserData(username)
      setData(result)
    } catch (err) {
      // err is already normalized by the axios interceptor
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, search, reset }
}
