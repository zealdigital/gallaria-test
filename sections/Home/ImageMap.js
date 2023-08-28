import styles from 'styles/modules/Home.module.scss'
import { Link } from 'components'

export default function ImageBox() {
  return (
    <div className={styles['interactive-image']}>
      <img src="/images/experience.png" alt="" />
      <Link
        href="/products?filterUrl=ACCESORIES"
        style={styles['image-map']}
        customStyle={{
          width: '69.76998904709748%',
          height: '45.58232931726908%',
          left: '2.40450438116103%',
          top: '45.582329317269036%'
        }}
      >
        <span style={{ left: '30%' }}>
          accessories
        </span>
        <img src="/images/map-accessories.png" style={{ height: '100%' }} />
      </Link>
      <Link
        href="/products?filterUrl=BATHING"
        style={styles['image-map']}
        customStyle={{
          width: '34.12529025191676%',
          height: '26.05622489959839%',
          left: '7.417031763417303%',
          top: '67.36955823293173%'
        }}
      >
        <span style={{ left: '45%', top: '-20%' }}>
          bathing
        </span>
        <img src="/images/map-tub.png" />
      </Link>
      <Link
        href="/products?filterUrl=DESIGNplus"
        style={styles['image-map']}
        customStyle={{
          width: '34.50164293537787%',
          height: '4.837751004016064%',
          left: '47.809049835706465%',
          top: '60.62489959839353%'
        }}
      >
        <span style={{ left: '43%', top: '130%' }}>
          design+
        </span>
        <img src="/images/map-design-plus.png" style={{ height: '100%' }} />
      </Link>
      <Link
        href="/products?filterUrl=WASHING"
        style={styles['image-map']}
        customStyle={{
          width: '19.527929901423878%',
          height: '9.338755020080322%',
          left: '54.65498357064622%',
          top: '52.850120481927725%'
        }}
      >
        <span style={{ left: '35%', top: '-80%' }}>
          washing
        </span>
        <img src="/images/map-basin.png" style={{ height: '100%' }} />
      </Link>
      <Link
        href="/products?filterUrl=INTELLIGENT-BATHROOM"
        style={styles['image-map']}
        customStyle={{
          width: '6.352683461117197%',
          height: '18.87550200803213%',
          left: '86.78949890470975%',
          top: '55.31927710843374%'
        }}
      >
        <span style={{ left: '-15%', top: '-40%' }}>
          intelligent bathroom
        </span>
        <img src="/images/map-toilet.png" style={{ height: '100%', width: 'auto' }} />
      </Link>
    </div>
  )
}
