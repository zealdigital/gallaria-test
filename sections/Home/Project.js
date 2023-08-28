import { useEffect } from 'react'
import styles from 'styles/modules/Home.module.scss'
import Link from 'components/Link'
import { showOpacity, showFromY } from 'utils/animationUtils'

export default function ProjectSection({ data }) {
  const showElement = () => {
    showFromY('projects-title', '')

    data.map(project => {
      showOpacity(`${project._id}-column`, `col-lg-6 ${styles['column']}`)
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', showElement)

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('scroll', showElement)
    }
  }, [])

  return (
    <div className={styles['section-project']}>
      <div className={`container ${styles['title-box']}`}>
        <div className="col-12">
          <div className={`container ${styles['title-padding']}`}>
            <div className={styles['title']}>
              <span id="projects-title">LATEST PROJECTS</span>
            </div>
            <div className={styles['divider']} />
          </div>
        </div>
      </div>
      <div className={`container ${styles['photo-box']}`}>
        <div className="row">
          {data.map(project => (
            <div id={`${project._id}-column`} key={project._id} className={`col-lg-6 ${styles['column']}`}>
              <Link href={`/project/${project._id}`} style={styles['photo']}>
                <img src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(project.cover)}`} />
                <div className={styles['overlay']} />
                <div className={`container ${styles['date']}`}>
                  <span>{project.date}</span>
                </div>
                <div className={`container ${styles['type']}`}>
                  <span>{project.type}</span>
                </div>
                <div className={`container ${styles['text']}`}>
                  <span>{project.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
