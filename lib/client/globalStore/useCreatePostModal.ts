import { create } from 'zustand'

type State = {
  isOpen: boolean
}

type Actions = {
  open: () => void
  close: () => void
}

type Store = State & Actions

const createPostModalStore = create<Store>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export function useCreatePostModal() {
  const { isOpen, open, close } = createPostModalStore((state) => ({
    isOpen: state.isOpen,
    open: state.open,
    close: state.close,
  }))
  return { isOpen, open, close }
}
