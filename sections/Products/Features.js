import styles from 'styles/modules/ProductDetail.module.scss'

function Features({ data }) {
  const { features } = data

  return (
    <div className={styles['section-features']}>
      <div className="container">
        <div className={styles['title-container']}>
          <span>FEATURES</span>
        </div>
      </div>
      {features.map(feature => (
        <fragment key={feature}>
          {!feature.includes('mp4') && (
            <img src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(feature).replace('(', '%28').replace(')', '%29')}`} />
          )}
          {feature.includes('mp4') && (
            <video controls>
              <source src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(feature).replace('(', '%28').replace(')', '%29')}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </fragment>
      ))}
    </div>
  )
}

export default Features
