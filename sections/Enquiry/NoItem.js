import Link from 'components/Link'
import styles from 'styles/modules/Enquiries.module.scss'

function NoItem() {
  return (
    <section className={styles['section-no-item']}>
      <div className="container">
        <div className={`${styles['divider']} ${styles['divider-1']}`} />
        <div className={styles['item-container']}>
          <div className={styles['text']}>
            No product is added to the enquiry.
          </div>
          <Link href="/products">
            BROWSE PRODUCTS
          </Link>
        </div>
        <div className={`${styles['divider']} ${styles['divider-2']}`} />
      </div>
    </section>
  )
}

export default NoItem
