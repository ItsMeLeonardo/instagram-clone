'use client'
import Link from 'next/link'
import { useState, type ChangeEvent } from 'react'
import BackIcon from 'remixicon-react/ArrowLeftSLineIcon'
import { useForm, type SubmitHandler } from 'react-hook-form'

import ImageEditIcon from 'remixicon-react/ImageEditLineIcon'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'

import FormField from 'components/shared/FormField'
import Avatar from 'components/shared/Avatar'
import Loader from 'components/shared/Loader'
import Button from 'components/shared/Button'
import FormFieldLoader from 'components/shared/FormField/Loader'

import { UserProfileUpdate, useUser } from 'lib/client/user/useUser'

import { InvalidEmailError, InvalidUsernameError } from 'service/client/user'
import { alertToast } from 'components/shared/Toaster'

import styles from './edit-profile.module.css'

type avatarPreview = {
  preview: string
  source: 'file' | 'url'
}

const usernamePattern = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/i

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UserProfileUpdate>()

  const { user, loading, updateProfile } = useUser()

  const [avatar, setAvatar] = useState<avatarPreview | null>(null)

  const readyData = user

  const removeAvatar = () => {
    if (!user) return
    setAvatar(null)
    setValue('avatar', user.avatar)
  }

  const handleChangeAvatarFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatar({ preview: url, source: 'file' })
  }

  const handleChangeAvatarUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value) return
    if (avatar) URL.revokeObjectURL(avatar.preview)
    setAvatar({ preview: value, source: 'url' })
  }

  const getChangedValues = (): Partial<UserProfileUpdate> => {
    if (!user) return {}
    type DefaultValues = Omit<UserProfileUpdate, 'avatar' | 'avatarFile'>
    const defaultValues: DefaultValues = {
      email: user.email,
      username: user.username,
      name: user.name || '',
      lastname: user.lastName || '',
      location: user.location,
    }

    const changedValues = Object.entries(defaultValues).reduce((acc, [k, v]) => {
      const key = k as keyof DefaultValues
      const value = getValues(key)
      if (typeof value !== 'string') return acc
      if (value && value !== v) {
        acc[key] = value
      }
      return acc
    }, {} as UserProfileUpdate)

    return changedValues
  }

  const getNewAvatar = (): string | FileList | undefined => {
    if (!user) return
    if (!avatar) return

    if (avatar.source === 'url') {
      return avatar.preview
    }
    return getValues('avatarFile')
  }

  const onSubmit: SubmitHandler<UserProfileUpdate> = () => {
    if (!user) return

    const changedValues = getChangedValues()
    const newAvatar = getNewAvatar()

    const changedValuesEntries = Object.entries(changedValues)

    const hasChangedValues = changedValuesEntries.length > 0
    if (!hasChangedValues && !newAvatar) {
      alertToast('Nothing to update', {
        theme: 'warning',
      })
      return
    }

    const profileUpdate = {
      ...changedValues,
    }

    if (newAvatar) {
      if (typeof newAvatar === 'string') {
        profileUpdate.avatar = newAvatar
      } else {
        profileUpdate.avatarFile = newAvatar
      }
    }

    updateProfile(profileUpdate)
      .then((user) => {
        if (!user) {
          alertToast('Something went wrong', {
            theme: 'danger',
          })
          return
        }
        removeAvatar()
        alertToast('Profile updated', {
          theme: 'success',
        })
      })
      .catch((error) => {
        if (error instanceof InvalidEmailError) {
          setError('email', { type: 'custom', message: error.message })
          return
        }
        if (error instanceof InvalidUsernameError) {
          setError('username', { type: 'custom', message: error.message })
          return
        }
        alertToast('Something went wrong', {
          theme: 'danger',
        })
      })
  }

  return (
    <section>
      <header className={styles.header}>
        <Link href="/app/settings" className={styles.back_button}>
          <BackIcon />
        </Link>
        <h1>Edit Profile</h1>
      </header>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <header className={styles.avatar_section}>
          {readyData ? (
            <>
              <div className={styles.label_container}>
                <label className={styles.avatar_label}>
                  <div className={styles.avatar_overlay}>
                    <ImageEditIcon size="24" />
                  </div>
                  <Avatar
                    src={(avatar && avatar.preview) || user.avatar}
                    alt="avatar"
                    size="xl"
                    bordered
                    onError={() => setError('avatar', { type: 'custom', message: 'error with image url' })}
                    onLoad={() => clearErrors('avatar')}
                  />
                  <input
                    type="file"
                    className={styles.file_input}
                    {...register('avatarFile')}
                    onInput={handleChangeAvatarFile}
                    accept="image/*"
                  />
                </label>

                {avatar && (
                  <button className={styles.remove_button} onClick={removeAvatar}>
                    <CloseLineIcon size="18" />
                  </button>
                )}
              </div>
              <div className={styles.data}>
                <span className={styles.username}>{user.username}</span>
                <span className={styles.location}>{user.location}</span>
              </div>
            </>
          ) : (
            <>
              <Avatar icon={<Loader size={32} />} alt="avatar" size="xl" bordered />
              <div className={styles.data}></div>
            </>
          )}
        </header>
        {readyData ? (
          <div className={styles.grid}>
            <FormField
              label="Email"
              type="email"
              defaultValue={user.email}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
              {...register('email', { required: 'Email is required' })}
            />
            <FormField
              label="Username"
              defaultValue={user.username}
              error={!!errors.username}
              helperText={errors.username?.message}
              disabled={loading}
              {...register('username', {
                required: 'Username is required',
                pattern: {
                  value: usernamePattern,
                  message: 'Username should only contain letters, numbers, underscores and dashes',
                },
              })}
            />
            <FormField
              label="First name"
              defaultValue={user.name}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading}
              {...register('name', {
                pattern: {
                  value: /^[A-Za-z ]+$/i,
                  message: 'First name should only contain letters',
                },
              })}
            />
            <FormField
              label="Last name"
              defaultValue={user.lastName}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
              disabled={loading}
              {...register('lastname', {
                pattern: {
                  message: 'Last name should only contain letters',
                  value: /^[A-Za-z ]+$/i,
                },
              })}
            />
            <FormField
              label="Location"
              defaultValue={user.location}
              error={!!errors.location}
              helperText={errors.location?.message}
              disabled={loading}
              {...register('location', { required: 'Location is required' })}
            />
            <FormField
              label="Avatar"
              type="url"
              defaultValue={user.avatar}
              error={!!errors.avatar}
              helperText={errors.avatar?.message || 'only urls from pinterest o unsplash are allowed'}
              disabled={loading}
              {...register('avatar', { required: 'Avatar is required' })}
              onChange={handleChangeAvatarUrl}
            />
          </div>
        ) : (
          <div className={styles.grid}>
            <FormFieldLoader />
            <FormFieldLoader />
            <FormFieldLoader />
            <FormFieldLoader />
            <FormFieldLoader />
            <FormFieldLoader />
          </div>
        )}

        <Button color="primary" type="submit" loading={loading} disabled={loading} rounded>
          <span className={styles.submit_label}>Save Changes</span>
        </Button>
      </form>
    </section>
  )
}
