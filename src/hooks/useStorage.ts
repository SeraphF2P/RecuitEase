"use client"
import { useCallback, useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, defaultValue: T) {
  // if (typeof window === "undefined") return;
  return useStorage<T>(key, defaultValue, window.localStorage)
}

export function useSessionStorage(key: string, defaultValue: string) {
  return useStorage(key, defaultValue, window.sessionStorage)
}

export default function useStorage<T>(key: string, defaultValue: T | ((val?: T) => T), storageObject: typeof window.localStorage) {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = storageObject.getItem(key)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove] as const
}
