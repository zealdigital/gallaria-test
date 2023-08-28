import { useContext, useEffect } from 'react'
import { Footer, Header, HeadMeta } from 'components'
import { EnquiryContext } from 'utils/enquiryCookie'
import { Form, List, NoItem } from 'sections/Enquiry'
import styles from 'styles/modules/Enquiries.module.scss'

function Projects() {
  const { enquiryAmount, setOpenEnquiry } = useContext(EnquiryContext)

  useEffect(() => {
    setOpenEnquiry(false)
  }, [])

  return (
    <div className={styles['container']}>
      <HeadMeta
        title="Enquiries - Gallaria"
        desc="INTELLIGENT BATHROOMS BY GALLARIA"
        keywords=""
        robots="index, follow"
        url="https://www.gallaria.com.au/enquiry"
        metaOG="/logo.png"
        metaTwitter="/logo.png"
      />

      <Header />
      <section className={styles['section-title']}>
        <div className="container">
          <div className={styles['title']}>
            ENQUIRIES {enquiryAmount > 0 && `(${enquiryAmount})`}
          </div>
        </div>
      </section>

      {enquiryAmount < 1 && <NoItem />}
      {enquiryAmount > 0 && <List />}
      {enquiryAmount > 0 && <Form />}
      <Footer />
    </div>
  )
}

export default Projects
