import { useEffect } from 'react'
import styles from 'styles/modules/Home.module.scss'
import { Link } from 'components'
import { showOpacity } from 'utils/animationUtils'

export default function DesignSection() {
  const showElement = () => {
    showOpacity('our-design', styles['text-box'])
  }

  useEffect(() => {
    window.addEventListener('scroll', showElement)

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('scroll', showElement)
    }
  }, [])

  return (
    <div className={`container ${styles['section-design']}`}>
      <Link href="/about-us">
        <div id="our-design" className={styles['text-box']}>
          <div className={styles['title']}>
            <span>ALL DESIGN</span>
          </div>
          <div className={styles['divider']} />
          <div className={styles['info']}>
            <span>
              All our designs are based on deep research and development by industry leading teams, then perfected using advanced 3D modelling techniques, and brought to life using the latest manufacturing processes and materials. We further assure the quality and utility of all our wares through rigorous quality inspection audits.
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
