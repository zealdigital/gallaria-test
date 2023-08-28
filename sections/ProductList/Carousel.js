import Carousel from 'react-multi-carousel'
import styles from 'styles/modules/ProductList.module.scss'
import { Link } from 'components'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1023, min: 960 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 959, min: 0 },
    items: 1
  }
}

function CarouselSection({ data }) {
  return (
    <div className={styles['section-carousel']}>
      <div className={`container ${styles['carousel-container']}`}>
        <Carousel
          responsive={responsive}
          showDots={true}
          removeArrowOnDeviceType={['desktop', 'tablet', 'mobile']}
          ssr={true}
          autoPlay
          infinite
          autoPlaySpeed={5000}
        >
          {data.map((d, i) => (i < 5) && (
            <div key={d.name} className={styles['item-container']}>
              <Link href={`/product/${d.code}`}>
                <div
                  className={styles['item']}
                  style={{
                    backgroundImage: `url('${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(d.featureImage)}')`
                  }}
                />
                <span className={styles['name']}>{d.name}</span>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default CarouselSection
