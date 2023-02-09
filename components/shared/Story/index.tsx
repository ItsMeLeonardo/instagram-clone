'use client'
import { useRef, useState } from 'react'

import AddIcon from 'remixicon-react/AddFillIcon'
import Avatar from 'components/shared/Avatar'
import type { Story } from 'types/story'

import styles from './story.module.css'
import Modal from '../Modal'
import CreateStory from 'components/CreateStory'

export type StoryProps = {
  stories: Story[]
}

export default function Story({ stories }: StoryProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [addStoryModal, setAddStoryModal] = useState(false)
  const selectedStory = useRef<Story | null>(null)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const openAddStoryModal = () => setAddStoryModal(true)
  const closeAddStoryModal = () => setAddStoryModal(false)

  const handleSelectStory = (id: number) => {
    const story = stories.find((story) => story.id === id)
    if (!story) return
    selectedStory.current = story
    openModal()
  }

  return (
    <aside className={styles.stories}>
      <button className={styles.story} onClick={openAddStoryModal}>
        <Avatar bordered size="lg" icon={<AddIcon size="28" />} alt="add story" />

        <span className={styles.label}>Add story</span>
      </button>
      {stories.map(({ user, id }) => (
        <button key={id} className={styles.story} onClick={() => handleSelectStory(id)}>
          <Avatar size="lg" bordered src={user.avatar} alt={user.username} />

          <span className={styles.label}>{user.username}</span>
        </button>
      ))}
      <Modal open={modalOpen} onClose={closeModal}>
        <div className={styles.story_modal}>
          <header className={styles.header}>
            <Avatar src={selectedStory.current?.user.avatar} alt="Story" />
            <span className={styles.username}>{selectedStory.current?.user.username}</span>
          </header>
          <picture className={styles.photo}>
            <img src={selectedStory.current?.photo} alt="" />
          </picture>
        </div>
      </Modal>
      <CreateStory open={addStoryModal} onClose={closeAddStoryModal} />
    </aside>
  )
}
