'use client'

import useSWR from 'swr'

import User from 'components/shared/User'

import { getSuggestions } from 'service/client/Suggestions'

import styles from './suggestions.module.css'
import Link from 'next/link'
import Loader from './Loader'

export default function Suggestions() {
  const { data: suggestions, isLoading } = useSWR('suggestions', getSuggestions, {
    revalidateOnFocus: false,
  })

  if (isLoading) {
    return <Loader />
  }

  if (!suggestions) return null

  return (
    <div className={styles.suggestions}>
      {suggestions.map(({ id, avatar, location, username }) => (
        <Link key={id} href={`app/${username}`}>
          <User avatar={avatar} name={username} description={location} interactive />
        </Link>
      ))}
    </div>
  )
}
