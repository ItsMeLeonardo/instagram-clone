import styles from './page-favorite.module.css'

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8amFwYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8amFwYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGphcGFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGphcGFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1557409518-691ebcd96038?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGphcGFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGphcGFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1512692723619-8b3e68365c9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGphcGFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGphcGFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1526374073174-7661a8028eb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGphcGFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
  {
    image:
      'https://images.unsplash.com/photo-1578637387939-43c525550085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fGphcGFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'posts saved',
  },
]

export default function Favorite() {
  return (
    <div className={styles.container}>
      {data.map(({ image, title }) => (
        <picture key={image} className={styles.item}>
          <img src={image} alt={title} />
          <span className={styles.title}>{title}</span>
        </picture>
      ))}
    </div>
  )
}
