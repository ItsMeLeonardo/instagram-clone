'use client'
import { useRef, useState } from 'react'

import AddIcon from 'remixicon-react/AddFillIcon'
import Avatar from 'components/shared/Avatar'
import type { StoryUser } from 'types/story'

import styles from './story.module.css'
import Modal from '../Modal'
import CreateStory from 'components/CreateStory'
import StorySlide from 'components/StorySlide'

export type StoryProps = {
  stories: StoryUser[]
}

export default function Story({ stories }: StoryProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [addStoryModal, setAddStoryModal] = useState(false)
  const selectedStory = useRef<StoryUser | null>(null)

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
      {stories.map(({ avatar, username, id }) => (
        <button key={id} className={styles.story} onClick={() => handleSelectStory(id)}>
          <Avatar size="lg" bordered src={avatar} alt={username} />

          <span className={styles.label}>{username}</span>
        </button>
      ))}
      <Modal open={modalOpen} onClose={closeModal}>
        {selectedStory.current && <StorySlide story={selectedStory.current} onCompleted={closeModal} />}
        {/*     <div className={styles.story_modal}>
          <div className={styles.top_steps}>
            <div className={styles.step}>
              <span className={styles.progress} style={{ width: '10%' }}></span>
            </div>
            <div className={styles.step}>
              <span className={styles.progress}></span>
            </div>
            <div className={styles.step}>
              <span className={styles.progress}></span>
            </div>
          </div>
          <header className={styles.header}>
            <Avatar src={selectedStory.current?.avatar} size="md" alt="Story" />
            <div className={styles.info}>
              <span className={styles.username}>{selectedStory.current?.username}</span>
              <span className={styles.time}>
                {selectedStory.current?.createdAt && timeAgo(selectedStory.current?.createdAt)}
              </span>
            </div>
          </header>
          <picture className={styles.photo}>
            <img
              src="https://images.unsplash.com/photo-1675789652767-d3bc9f56abd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=60"
              alt=""
            />
          </picture>
        </div> */}
      </Modal>
      <CreateStory open={addStoryModal} onClose={closeAddStoryModal} />
    </aside>
  )
}
