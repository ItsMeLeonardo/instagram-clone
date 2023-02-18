import { create } from 'zustand'
import { shallow } from 'zustand/shallow'

type State = {
  isOpen: boolean
  postId?: number
}

type Actions = {
  open: (postId: number) => void
  close: () => void
}

const usePostDetailModalStore = create<State & Actions>((set) => ({
  isOpen: false,
  postId: undefined,
  open(postId) {
    set({ isOpen: true, postId })
  },
  close() {
    set({ isOpen: false, postId: undefined })
  },
}))

export function usePostDetailModal() {
  const store = usePostDetailModalStore(
    (state) => ({
      isOpen: state.isOpen,
      postId: state.postId,
      open: state.open,
      close: state.close,
    }),
    shallow
  )

  return store
}

export function useOpenPostDetailModal() {
  const open = usePostDetailModalStore((state) => state.open, shallow)

  return open
}
