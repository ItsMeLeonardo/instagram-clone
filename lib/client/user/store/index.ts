import { create } from 'zustand'

import type { User, UserDetail } from 'types/user'

type State = {
  user: UserDetail | null
}

type Actions = {
  setUser: (user: UserDetail) => void
  updateUserInformation: (user: Partial<User>) => void
}

export type UserStore = State & Actions

export const useUserStore = create<State>(() => ({
  user: null,
}))

export const useStoreActions: Actions = {
  setUser: (user) => {
    useUserStore.setState(() => ({ user }))
  },
  updateUserInformation: (user) => {
    useUserStore.setState((state) => {
      if (!state.user) return state
      return {
        user: {
          ...state.user,
          ...user,
        },
      }
    })
  },
}
