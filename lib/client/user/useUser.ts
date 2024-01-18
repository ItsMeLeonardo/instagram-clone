import { shallow } from 'zustand/shallow'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { whoAmI } from 'service/client/auth/who-am-i'

import { useUserStore, useStoreActions } from 'lib/client/user/store'
import { updateUser } from 'service/client/user'

const { setUser, updateUserInformation } = useStoreActions

export type UserProfileUpdate = {
  email: string
  username: string
  name: string
  lastname: string
  location: string
  avatar?: string
  avatarFile?: FileList
}

export function useUser() {
  const { status } = useSession()

  const user = useUserStore((state) => state.user, shallow)

  const [loading, setLoading] = useState(false)

  const waitingForAuth = status === 'loading'

  useEffect(() => {
    if (user) return
    if (status !== 'loading' && status === 'authenticated') {
      whoAmI().then((userDetail) => {
        if (userDetail) setUser(userDetail)
      })
    }
  }, [status, user])

  const updateProfile = (data: Partial<UserProfileUpdate>) => {
    setLoading(true)
    const formData = new FormData()

    const dataEntries = Object.entries(data)

    dataEntries.forEach(([k, value]) => {
      const key = k as keyof UserProfileUpdate
      if (typeof value !== 'string') return
      formData.append(key, value)
    })

    if (data.avatarFile) {
      formData.append('avatarFile', data.avatarFile[0])
    }

    return updateUser(formData)
      .then((user) => {
        if (!user) return
        updateUserInformation(user)
        return user
      })
      .finally(() => setLoading(false))
  }

  return {
    loading: waitingForAuth || loading,
    updateProfile,
    user,
  }
}

export function useUserAvatar() {
  const avatar = useUserStore((state) => state.user?.avatar, shallow)

  return avatar
}
