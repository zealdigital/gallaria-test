import Carousel from 'react-multi-carousel'
import styles from 'styles/modules/ProjectDetails.module.scss'
import Link from 'components/Link'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  mobile: {
    breakpoint: { max: 3000, min: 0 },
    items: 1
  }
}

export default function ProjectSection({ data }) {
  return (
    <div className={styles['projects']}>
      <div className={`container ${styles['title-box']}`}>
        <span>LATEST PROJECTS</span>
      </div>
      <div className={`container ${styles['photo-box']}`}>
        <div className="row">
          {data.map(project => (
            <div key={project._id} className={`col-lg-6 ${styles['column']}`}>
              <Link href={`/project/${project._id}`} style={styles['photo']}>
                <img width="100%" src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(project.cover)}`} />
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
      <div className={`${styles['mobile-carousel']} container`}>
        <Carousel
          responsive={responsive}
          ssr={true}
          customLeftArrow={<div />}
          customRightArrow={<div />}
        >
          {data.map(project => (
            <Link
              key={project._id}
              href={`/project/${project._id}`}
            >
              <div
                className={styles['project']}
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(project.cover)})`
                }}
              >
                <div className={styles['overlay']} />
                <div className={styles['title']}>{project.name}</div>
                <div className={styles['info']}>{project.location}</div>
                <div className={styles['info']} style={{ marginTop: 'auto' }}>{project.type}</div>
                <div className={styles['info']}>{project.date}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
