import Carousel from 'react-multi-carousel'
import styles from 'styles/modules/ProjectDetails.module.scss'
import { Link } from 'components'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 960 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 959, min: 577 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 2
  }
}

function Products({ data }) {
  const { products } = data

  return (
    <div className="container">
      <div className={styles['products-title']}>
        PRODUCTS USED
      </div>
      <div className={styles['products-carousel']}>
        <Carousel
          responsive={responsive}
          ssr={true}
          sliderClass={`${styles['slider']} row`}
          itemClass={`${styles['slider-items']} col-6 col-md-4 col-lg-3`}
        >
          {products.map(product => (
            <Link
              key={product.code}
              href={`/product/${product.code}`}
            >
              <div
                className={styles['product']}
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(product.primaryImage).replace('(', '%28').replace(')', '%29')})`
                }}
              >
                <div className={styles['overlay']} />
                <div className={styles['info']}>VIEW PRODUCT</div>
                <div className={styles['title']} style={{ marginTop: 'auto' }}>{product.name}</div>
                <div className={styles['info']}>Code: {product.code}</div>
              </div>
              <div className={styles['mobile-code']}>Code: {product.code}</div>
              <div className={styles['mobile-title']}>{product.name}</div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Products
