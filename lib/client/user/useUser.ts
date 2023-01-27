import { shallow } from 'zustand/shallow'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { whoAmI } from 'service/client/auth/who-am-i'

import { useUserStore, useStoreActions } from 'lib/client/user/store'

const { setUser } = useStoreActions

export function useUser() {
  const { status } = useSession()

  const user = useUserStore((state) => state.user, shallow)

  useEffect(() => {
    if (user) return
    if (status !== 'loading' && status === 'authenticated') {
      whoAmI().then((userDetail) => {
        if (userDetail) setUser(userDetail)
      })
    }
  }, [status, user])

  return {
    loading: status === 'loading',
    user,
  }
}

export function useUserAvatar() {
  const avatar = useUserStore((state) => state.user?.avatar, shallow)

  return avatar
}
