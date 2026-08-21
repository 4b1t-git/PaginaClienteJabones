import { useEffect, useState } from 'react'

export const usePersistentState = <T,>(key: string, fallback: () => T, restore = (stored: T) => stored) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? restore(JSON.parse(stored) as T) : fallback()
    } catch {
      return fallback()
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // The prototype remains usable when storage is unavailable.
    }
  }, [key, value])

  return [value, setValue] as const
}
