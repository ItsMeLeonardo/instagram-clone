import { useState } from 'react'

import { localStorageService } from 'lib/client/persistence'
import { logger } from 'utils/shared/logs'

type Props<T> = {
  key: string
  initialValue?: T
}

type Return<T> = [T | null, (value: T) => void]

export const useLocalStorage = <T>({ key, initialValue }: Props<T>): Return<T> => {
  const [data, setData] = useState<T | null>((): T | null => {
    try {
      const value = localStorageService.get<T>(key)

      if (value) return value

      if (initialValue) {
        localStorageService.set(key, initialValue)
        return initialValue
      }
      return null
    } catch (error) {
      return null
    }
  })

  const setLocalStorage = (value: T) => {
    try {
      localStorageService.set(key, value)
      setData(value)
    } catch (error) {
      logger.error(error)
    }
  }

  return [data, setLocalStorage]
}
