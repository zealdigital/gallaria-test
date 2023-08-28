import { useEffect, useState } from 'react'
import { Footer, Header, Link, HeadMeta } from 'components'
import styles from 'styles/modules/Projects.module.scss'
import request from 'utils/request'
import { queryGetProjects } from 'utils/graphql'

function Projects({ projects }) {
  const [list] = useState(projects)
  const [current, setCurrent] = useState(1)
  const perPage = 10

  return (
    <div className={styles['container']}>
      <HeadMeta
        title="Projects - Gallaria"
        desc="INTELLIGENT BATHROOMS BY GALLA"
        keywords=""
        robots="index, follow"
        url="https://www.gallaria.com.au/enquiry"
        metaOG="/logo.png"
        metaTwitter="/logo.png"
      />

      <Header />
      <div className="container" style={{ height: '100%' }}>
        <div className={styles['title']}>ALL PROJECTS</div>
        <div className={`${styles['content']} row`}>
          {list?.map((l, i) => (i >= ((current * perPage) - perPage) && i < current * perPage) && (
            <Link key={l.name} href={`/project/${l._id}`} style={`${styles['items']} col`}>
              <div
                className={styles['item-container']}
                style={{
                  backgroundImage: `url('${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(l.cover)}')`
                }}
              >
                <div className={styles['item-overlay']} />
                <div className={styles['name']}>
                  {l.name}
                </div>
                <div className={styles['info']}>
                  <div className={styles['info-label']}>LOCATION</div>
                  {l.location}
                </div>
                <div className={styles['info']}>
                  <div className={styles['info-label']}>TYPE</div>
                  {l.type}
                </div>
                <div className={styles['info']}>
                  <div className={styles['info-label']}>YEAR</div>
                  {l.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {list?.length > perPage && (
          <Pagination
            list={list}
            current={current}
            setCurrent={setCurrent}
            perPage={perPage}
          />
        )}
      </div>
      <Footer />
    </div>
  )
}

const Pagination = ({ list, current, setCurrent, perPage }) => {
  const [total, setTotal] = useState(1)

  useEffect(() => {
    let calc = Math.floor(list.length / perPage)
    if (list.length % perPage > 0) calc += 1
    setTotal(calc)
  }, [])

  return (
    <div className={styles['pagination']}>
      <div
        className={`${styles['prev-page']}${current === 1 ? ` ${styles['first']}` : ''}`}
        onClick={() => setCurrent(current - 1)}
      >
        &lt;
      </div>
      <div className={styles['pages']}>
        {(current - 4 > 0 && current === total) && (
          <div
            className={styles['page']}
            onClick={() => setCurrent(current - 4)}
          >
            {current - 4}
          </div>
        )}
        {(current - 3 > 0 && (current === total || current === total - 1)) && (
          <div
            className={styles['page']}
            onClick={() => setCurrent(current - 3)}
          >
            {current - 3}
          </div>
        )}
        {current - 2 > 0 && (
          <div
            className={styles['page']}
            onClick={() => setCurrent(current - 2)}
          >
            {current - 2}
          </div>
        )}
        {current - 1 > 0 && (
          <div
            className={styles['page']}
            onClick={() => setCurrent(current - 1)}
          >
            {current - 1}
          </div>
        )}
        <div className={`${styles['page']}  ${styles['current']}`}>
          {current}
        </div>
        {total >= current + 1 && (
          <div
            className={styles['page']}
            onClick={() => setCurrent(current + 1)}
          >
            {current + 1}
          </div>
        )}
        {total >= current + 2 && (
          <div
            className={styles['page']}
            onClick={() => setCurrent(current + 2)}
          >
            {current + 2}
          </div>
        )}
        {(total > current + 3 && (current === 1 || current === 2)) && (
          <div
            className={styles['page']}
            onClick={() => setCurrent(current + 3)}
          >
            {current + 3}
          </div>
        )}
        {(total > current + 4 && (current === 1)) && (
          <div
            className={styles['page']}
            onClick={() => setCurrent(current + 4)}
          >
            {current + 4}
          </div>
        )}
      </div>
      <div
        className={`${styles['next-page']}${current === total ? ` ${styles['last']}` : ''}`}
        onClick={() => setCurrent(current + 1)}
      >
        &gt;
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const projectsQuery = await request(queryGetProjects)
  const projects = projectsQuery.data.data.getProjects

  return {
    props: { projects }, // will be passed to the page component as props
  }
}

export default Projects
