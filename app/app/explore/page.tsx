import ExplorePost from 'components/explore/ExplorePost'

import postService from 'service/server/post'
import styles from './page-explore.module.css'

export default async function Explore() {
  const posts = await postService.getExplorePosts()

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <ExplorePost key={post.id} post={post} />
      ))}
    </div>
  )
}
