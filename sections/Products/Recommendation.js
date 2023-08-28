// import { useState } from 'react'
import styles from 'styles/modules/ProductDetail.module.scss'
import { Link } from 'components'

function Recommendation({ recommendations }) {
  return (
    <div className={`container ${styles['section-recommendation']}`}>
      <div className={styles['title-container']}>
        <span>
          PRODUCTS YOU MIGHT LIKE
        </span>
      </div>
      <div className={`row ${styles['items-container']}`}>
        {recommendations.map(recommendation => (
          <div
            key={recommendation.code}
            className={`col-6 col-lg-3 ${styles['items']}`}
          >
            <Link href={`/product/${recommendation.code}`}>
              <div
                className={styles['image']}
                style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(recommendation.primaryImage)}')` }}
              >
                <div className={styles['img-overlay']} />
                <span className={styles['view']}>VIEW PRODUCT</span>
                <span className={styles['name']}>{recommendation.name}</span>
                <span className={styles['code']}>
                  Code: &nbsp;
                  {recommendation.code}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recommendation
