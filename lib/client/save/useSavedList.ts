import useSWR from 'swr'

import { getSavedPosts, createSavedList, addPostToList, removePostFromList } from 'service/client/saved'
import { SavedList } from 'types/saved'

export const SAVED_LIST_KEY = 'saved-list'

export function useSavedList() {
  const { data, isLoading, mutate } = useSWR(SAVED_LIST_KEY, getSavedPosts, {
    revalidateOnFocus: false,
  })

  const createList = async (title: string) => {
    mutate(async (data) => {
      const oldList = data as SavedList[]
      const newList = await createSavedList(title)

      return [...oldList, newList]
    })
  }

  const savePost = async (listId: number, postId: number) => {
    await addPostToList(listId, postId)
  }

  const removePost = async (listId: number, postId: number) => {
    await removePostFromList(listId, postId)
  }

  return {
    savedList: data,
    savePost,
    isLoading,
    createList,
    removePost,
  }
}
