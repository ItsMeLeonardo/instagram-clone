import Github from './Github'
// import Google from './Google'
import styles from './social-media-buttons.module.css'

export default function SocialMediaButtons() {
  return (
    <div className={styles.container}>
      {/* <Google /> */}
      <Github />
    </div>
  )
}
