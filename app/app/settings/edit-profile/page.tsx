'use client'
import BackIcon from 'remixicon-react/ArrowLeftSLineIcon'
import { useForm, type SubmitHandler } from 'react-hook-form'

import FormField from 'components/shared/FormField'
import Avatar from 'components/shared/Avatar'
import Loader from 'components/shared/Loader'
import Button from 'components/shared/Button'
import FormFieldLoader from 'components/shared/FormField/Loader'

import { useUser } from 'lib/client/user/useUser'

import styles from './edit-profile.module.css'
import Link from 'next/link'

type EditProfileForm = {
  email: string
  username: string
  name: string
  lastName: string
  location: string
  avatar: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<EditProfileForm>()

  const { user, loading } = useUser()

  const watchInput = watch('avatar')
  const readyData = !loading && user

  const onSubmit: SubmitHandler<EditProfileForm> = (data) => {
    console.log(data)
  }

  const avatar = watchInput || user?.avatar

  return (
    <section>
      <header className={styles.header}>
        <Link href="/app/settings" className={styles.back_button}>
          <BackIcon />
        </Link>
        <h1>Change password</h1>
      </header>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <header className={styles.avatar_section}>
          {readyData ? (
            <>
              <Avatar
                src={avatar}
                alt="avatar"
                size="xl"
                bordered
                onError={() => setError('avatar', { type: 'custom', message: 'error with image url' })}
                onLoad={() => clearErrors('avatar')}
              />
              <div className={styles.data}>
                <span className={styles.username}>{user.username}</span>
                <span className={styles.location}>{user.location}</span>
              </div>
            </>
          ) : (
            <Avatar icon={<Loader size={32} />} alt="avatar" size="xl" bordered />
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
              {...register('email', { required: 'Email is required' })}
            />
            <FormField
              label="Username"
              defaultValue={user.username}
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register('username', { required: 'Username is required' })}
            />
            <FormField
              label="First name"
              defaultValue={user.name}
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', {
                required: 'First name is required',
              })}
            />
            <FormField
              label="Last name"
              defaultValue={user.lastName}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register('lastName', {
                required: 'Last name is required',
              })}
            />
            <FormField
              label="Location"
              defaultValue={user.location}
              error={!!errors.location}
              helperText={errors.location?.message}
              {...register('location', { required: 'Location is required' })}
            />
            <FormField
              label="Avatar"
              type="url"
              defaultValue={user.avatar}
              error={!!errors.avatar}
              helperText={errors.avatar?.message}
              {...register('avatar', { required: 'Avatar is required' })}
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

        <Button color="primary" type="submit">
          <span className={styles.submit_label}>Save Changes</span>
        </Button>
      </form>
    </section>
  )
}
