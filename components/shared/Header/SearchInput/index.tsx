'use client'
import { useRef, useState } from 'react'
import debounce from 'just-debounce'

import MagnifyingGlass from 'remixicon-react/SearchLineIcon'
import User from 'components/shared/User'

import { findUser } from 'service/client/user'

import type { UserFindResult } from 'types/user'

import styles from './search-input.module.css'
import Loader from 'components/shared/Loader'
import MicInput from 'components/shared/MicInput'

export default function SearchInput() {
  const [results, setResults] = useState<UserFindResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = debounce((keyword: string) => {
    if (keyword.trim().length === 0) {
      setResults(null)
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
    <div className={styles.container}>
      <label className={styles.search_input}>
        <span className={styles.icon} data-icon-left>
          <MagnifyingGlass size="16" />
        </span>
        <input
          ref={inputRef}
          className={styles.input}
          onInput={(e) => handleSearch(e.currentTarget.value)}
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

      {results && (
        <aside className={styles.results}>
          {results.length > 0 ? (
            <ul className={styles.list}>
              {results.map(({ avatar, id, email, username }) => (
                <li key={id} className={styles.item}>
                  <button className={styles.result_item}>
                    <User avatar={avatar} description={email} name={username} interactive />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <li className={styles.item}>
              <p className={styles.not_found}>No results found</p>
            </li>
          )}
        </aside>
      )}
    </div>
  )
}
