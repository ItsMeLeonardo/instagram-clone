'use client'
import { useState } from 'react'
import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'

import ArrowUpIcon from 'remixicon-react/ArrowUpSFillIcon'

import Modal, { ModalProps } from 'components/shared/Modal'
import styles from './post-details.module.css'
import User from 'components/shared/User'
import Comment from './Comment'
import CommentSection from 'components/shared/Post/Comment'

import BottomSheet from 'components/shared/BottomSheet'
import { usePostDetail } from 'lib/client/post/usePostDetail'
import Loader from 'components/shared/Loader'
// import ButtonOptions from 'components/shared/Post/ButtonOptions'

type PostDetailProps = {
  postId: number
} & Omit<ModalProps, 'children'>

export default function PostDetail({ postId, onClose, open }: PostDetailProps) {
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const { isLoading, post } = usePostDetail(postId)

  const openBottomSheet = () => setBottomSheetIsOpen(true)

  const closeBottomSheet = () => setBottomSheetIsOpen(false)

  if (typeof window === 'undefined') return null

  if (isLoading || !post) return <Loader />

  const { photos, description, user, comments } = post

  const currentPhoto = photos[currentPhotoIndex]

  const handleNextPhoto = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1)
    }
  }

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1)
    }
  }

  const isLastPhoto = currentPhotoIndex === photos.length - 1
  const isFirstPhoto = currentPhotoIndex === 0

  const commentDetails = (
    <div className={styles.details}>
      <header className={styles.header}>
        <User avatar={user.avatar} description={user.location} name={user.username} />
      </header>

      <div className={styles.body}>
        <div className={styles.description}>{description}</div>

        <div className={styles.comments}>
          {comments.map((comment) => (
            <Comment
              key={comment.commentId}
              avatar={comment.user.avatar}
              comment={comment.comment}
              username={comment.user.username}
            />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <CommentSection postId={postId} />
      </footer>
    </div>
  )

  return (
    <Modal open={open} onClose={onClose}>
      <aside className={styles.container}>
        <picture className={styles.photos}>
          {!isFirstPhoto && (
            <button className={styles.icon_button} data-arrow-left onClick={handlePrevPhoto}>
              <ArrowLeft size={16} />
            </button>
          )}

          {!isLastPhoto && (
            <button className={styles.icon_button} data-arrow-right onClick={handleNextPhoto}>
              <ArrowRight size={16} />
            </button>
          )}
          <button className={styles.icon_button} data-close onClick={onClose}>
            <CloseLineIcon />
          </button>
          <img src={currentPhoto} alt={description} />
        </picture>
        <div className={styles.desktop_detail_container}>{commentDetails}</div>

        <div className={styles.bottom_sheet_container}>
          <button className={styles.open_button} onClick={openBottomSheet}>
            <ArrowUpIcon />
          </button>
          <BottomSheet isOpen={bottomSheetIsOpen} close={closeBottomSheet}>
            <div className={styles.details}>{commentDetails}</div>
          </BottomSheet>
        </div>
      </aside>
    </Modal>
  )
}
