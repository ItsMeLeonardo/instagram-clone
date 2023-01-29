'use client'
import { useEffect, useState } from 'react'
import debounce from 'just-debounce'

import MagnifyingGlass from 'remixicon-react/SearchLineIcon'
import Microphone from 'remixicon-react/Mic2LineIcon'
import User from 'components/shared/User'

import { findUser } from 'service/client/user'

import type { UserFindResult } from 'types/user'

import styles from './search-input.module.css'
import Loader from 'components/shared/Loader'

export default function SearchInput() {
  const [results, setResults] = useState<UserFindResult[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const emptyResults = results && results.length === 0
    let timeout: ReturnType<typeof setTimeout>

    if (emptyResults) {
      timeout = setTimeout(() => {
        setResults(null)
      }, 2000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [results])

  const handleSearch = debounce((e) => {
    const event = e as Event
    const input = event.target as HTMLInputElement
    const keyword = input.value

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
        <input className={styles.input} onInput={handleSearch} placeholder="Find someone" />
        <button className={styles.icon} data-icon-right data-icon-button>
          {loading ? <Loader size={20} /> : <Microphone size="16" />}
        </button>
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
