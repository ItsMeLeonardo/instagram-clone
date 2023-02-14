import { create } from 'zustand'

type State = {
  followingsId: number[]
  followersId: number[]
}

type Actions = {}

const useFriendshipsStore = create((set) => ({}))
