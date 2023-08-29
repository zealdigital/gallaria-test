import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from 'styles/modules/ProjectDetails.module.scss'
import { Breadcrumbs, Footer, Header, HeadMeta } from 'components'
import request from 'utils/request'
import { queryProjectPaths, queryGetProjectById, queryGetLatestProjects } from 'utils/graphql'
import Products from 'sections/ProjectDetails/Products'
import OtherProjects from 'sections/ProjectDetails/Project'
import Error from '../_error'

function Project({ data, recommendations }) {
  const router = useRouter()
  const { status } = router.query

  useEffect(() => {
    document.body.className = ''
  }, [])

  if (!data || (data.isDraft && status !== 'preview')) return <Error status={404} />

  const breadcrumbs = [
    { name: 'BACK TO PROJECTS', link: '/projects' },
    { name: data.name }
  ]

  return (
    <div className={styles['container']}>
      <HeadMeta
        title={`${data.name} - Gallaria`}
        desc={data.desc}
        keywords=""
        robots="index, follow"
        url={`https://www.gallaria.com.au/project/${data._id}`}
        metaOG={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(data.cover).replace('(', '%28').replace(')', '%29')}`}
        metaTwitter={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(data.cover).replace('(', '%28').replace(')', '%29')}`}
      />

      <Header />
      <Breadcrumbs crumbs={breadcrumbs} />
      <div className={`${styles['title']} container`}>
        <span>
          {data.name}
        </span>
      </div>
      <div className={`${styles['cover-photo']} container`}>
        <img
          src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(data.cover).replace('(', '%28').replace(')', '%29')}`}
        />
      </div>
      <div className={`${styles['info-row']} container`}>
        <div className="row">
          <div className={`${styles['info-container']} col-lg-4`}>
            <div className={`${styles['info-box']}`}>
              <div className={`${styles['info-title']}`}>
                LOCATION
              </div>
              <div className={`${styles['info-detail']}`}>
                {data.location}
              </div>
            </div>
            <div className={`${styles['info-box']}`}>
              <div className={`${styles['info-title']}`}>
                TYPE
              </div>
              <div className={`${styles['info-detail']}`}>
                {data.type}
              </div>
            </div>
            <div className={`${styles['info-box']}`}>
              <div className={`${styles['info-title']}`}>
                YEAR
              </div>
              <div className={`${styles['info-detail']}`}>
                {data.date}
              </div>
            </div>
            <div className={styles['desc-box']} dangerouslySetInnerHTML={{ __html: data.desc.replace(/\n/g, '<br />') }} />
          </div>
          <div className={`${styles['first-photo']} col-lg-8`}>
            <img
              src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(data.photos[0]).replace('(', '%28').replace(')', '%29')}`}
            />
          </div>
        </div>
      </div>
      <div className={`${styles['photos']} container`}>
        {data.photos?.map((photo, i) => i !== 0 && (
          <img
            key={photo}
            src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(photo).replace('(', '%28').replace(')', '%29')}`}
          />
        ))}
      </div>
      <Products data={data} />
      {recommendations.length > 0 && (
        <OtherProjects data={recommendations} />
      )}
      <Footer />
    </div>
  );
}

export async function getStaticProps(ctx) {
  const { id, res } = ctx.params

  const response = await request(queryGetProjectById, { id })
  const data = response.data.data.getProjectById
  const reList = await request(queryGetLatestProjects, { id })
  const recommendations = reList.data.data.getLatestProjects

  if (!data && res) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data, recommendations }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const response = await request(queryProjectPaths)
  const { getAllProjects } = (response.data || {}).data

  const paths = ["/project/60a34a31bacaa30015744e4e", "/project/60fa4509b5ab740015d75284"]

  return {
    paths,
    fallback: false // See the "fallback" section below
  }
}

export default Project
