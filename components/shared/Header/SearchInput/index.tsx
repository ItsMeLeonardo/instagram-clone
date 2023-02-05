'use client'
import { useRef, useState } from 'react'
import debounce from 'just-debounce'
import { motion, AnimatePresence, type AnimationProps } from 'framer-motion'

import RemoveIcon from 'remixicon-react/CloseLineIcon'

import MagnifyingGlass from 'remixicon-react/SearchLineIcon'
import User from 'components/shared/User'

import { findUser } from 'service/client/user'

import type { UserFindResult } from 'types/user'

import styles from './search-input.module.css'
import Loader from 'components/shared/Loader'
import MicInput from 'components/shared/MicInput'
import { useClickOutside } from 'utils/client/shared/hooks/useClickOutside'
import { useLocalStorage } from 'utils/client/shared/hooks/useLocalStorage'

const resultsAnimation: AnimationProps = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const STORAGE_KEY = 'recent_searches'

export default function SearchInput() {
  const [results, setResults] = useState<UserFindResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [recentSearches, setRecentSearches] = useLocalStorage<UserFindResult[]>({ key: STORAGE_KEY, initialValue: [] })
  const [resultVisible, setResultVisible] = useState(false)

  useClickOutside(containerRef, () => setResultVisible(false))

  const addRecentSearch = (user: UserFindResult) => {
    const exist = recentSearches?.find((u) => u.id === user.id)
    if (exist) return
    const newList = recentSearches ? [user, ...recentSearches] : [user]
    setRecentSearches(newList)
  }

  const removeRecentSearch = (id: number) => {
    if (!recentSearches) return
    const newList = recentSearches.filter((u) => u.id !== id)
    setRecentSearches(newList)
  }

  const handleSearch = debounce((keyword: string) => {
    if (keyword.trim().length === 0) {
      setResults([])
      return
    }

    setLoading(true)
    findUser({ keyword })
      .then((results) => {
        if (results) setResults(results)
        else setResults([])
      })
      .catch(() => {
        setResults([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, 500)

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()} ref={containerRef}>
      <label className={styles.search_input}>
        <span className={styles.icon} data-icon-left>
          <MagnifyingGlass size="16" />
        </span>
        <input
          ref={inputRef}
          className={styles.input}
          onInput={(e) => handleSearch(e.currentTarget.value)}
          onFocus={() => setResultVisible(true)}
          placeholder="Find someone"
        />
        <div className={styles.icon} data-icon-right data-icon-button>
          {loading ? (
            <Loader size={20} />
          ) : (
            <MicInput
              onResult={(transcript) => {
                if (!inputRef.current) return
                inputRef.current.value = transcript
                handleSearch(transcript)
              }}
            />
          )}
        </div>
      </label>
      <AnimatePresence>
        {resultVisible && (
          <motion.aside {...resultsAnimation} key="search-results" className={styles.results}>
            {results.length > 0 ? (
              <ul className={styles.list}>
                {results.map((user) => {
                  const { avatar, id, email, username } = user
                  return (
                    <li key={id} className={styles.item}>
                      <button className={styles.result_item} onClick={() => addRecentSearch(user)}>
                        <User avatar={avatar} description={email} name={username} interactive />
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <li className={styles.item}>
                <p className={styles.not_found}>No results found</p>
              </li>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {recentSearches && resultVisible && !inputRef.current?.value.length && (
          <motion.aside {...resultsAnimation} key="resent-searches" className={styles.results}>
            <ul className={styles.list}>
              {recentSearches.map(({ avatar, id, email, username }) => (
                <li key={id} className={styles.item}>
                  <button className={styles.result_item}>
                    <User avatar={avatar} description={email} name={username} interactive />
                  </button>

                  <button className={styles.remove} onClick={() => removeRecentSearch(id)}>
                    <RemoveIcon size="16" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
