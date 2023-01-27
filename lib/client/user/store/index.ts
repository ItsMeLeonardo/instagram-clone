import { create } from 'zustand'

import type { UserDetail } from 'types/user'

type State = {
  user: UserDetail | null
}

type Actions = {
  setUser: (user: UserDetail) => void
}

export type UserStore = State & Actions

export const useUserStore = create<State>(() => ({
  user: null,
}))

export const useStoreActions: Actions = {
  setUser: (user) => {
    useUserStore.setState(() => ({ user }))
  },
}
