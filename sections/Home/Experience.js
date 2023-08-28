import { useEffect } from 'react'
import styles from 'styles/modules/Home.module.scss'
import { showFromY } from 'utils/animationUtils'
import ImageMap from './ImageMap'

export default function ExperienceSection() {
  const showElement = () => {
    showFromY('experience-title', '')
  }

  useEffect(() => {
    window.addEventListener('scroll', showElement)

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('scroll', showElement)
    }
  }, [])

  return (
    <div className={styles['section-experience']}>
      <div className={`container ${styles['title-box']}`}>
        <div className="col-6">
          <div className={`container ${styles['title-padding']}`}>
            <div className={styles['title']}>
              <span id="experience-title">
                COMPLETE YOUR BATHROOM EXPERIENCE WITH GALLARIA
              </span>
            </div>
            <div className={styles['divider']} />
          </div>
        </div>
      </div>
      <div className={styles['experience-image']}>
        <ImageMap />
        <img src="/images/experience.png" className={styles['mobile-image']} />
      </div>
    </div>
  )
}
