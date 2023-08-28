import { useEffect } from 'react'
import styles from 'styles/modules/Home.module.scss'
import { Link } from 'components'
import { showOpacity, showFromY } from 'utils/animationUtils'

export default function HighlightSection({ catHighlight, productHighlight/* , scrolling, setScrolling, scrollToHero, setTouch, touch */ }) {
  const MobileBox = ({ link, img, text }) => (
    <Link href={link} style="col-6">
      <div
        className={styles['mobile-box-img']}
        style={{ backgroundImage: `url('${img}')` }}
      />
      <span className={styles['mobile-box-txt']}>{text}</span>
    </Link>
  )

  /* const wheelEvent = (e) => {
    const hero = document.getElementById('hero')
    if (e.deltaY < 0 && document.body.getBoundingClientRect().top + 1 > 0 - hero.clientHeight) {
      setScrolling(true)
      !scrolling && scrollToHero()
    }
  }

  const touchEvent = (e) => {
    const hero = document.getElementById('hero')
    if (e.touches[0].pageY - touch > 0 && document.body.getBoundingClientRect().top + 1 > 0 - hero.clientHeight) {
      setScrolling(true)
      !scrolling && scrollToHero()
    }
  }

  const touchEndEvent = (e) => {
    const hero = document.getElementById('hero')
    if (e.changedTouches[0].pageY - touch > 0 && document.body.getBoundingClientRect().top + 1 > 0 - hero.clientHeight) {
      setScrolling(true)
      !scrolling && scrollToHero()
    }
  } */

  const showElement = () => {
    showFromY('highlight-title-1', '')
    showFromY('highlight-title-2', '')
    showFromY('highlight-desc-1', '')
    showFromY('highlight-desc-2', '')
    showOpacity('highlight-video-1', `col-1 ${styles['video-container']}`)
    showOpacity('highlight-video-2', `col-1 ${styles['video-container']}`)
    showOpacity('highlight-cat', `col-12 ${styles['flex-container']}`)
    showOpacity('highlight-item-1', styles['img-box'])
    showOpacity('highlight-item-2', styles['img-box'])
    showOpacity('highlight-item-3', styles['img-box'])
  }

  useEffect(() => {
    window.addEventListener('scroll', showElement)

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('scroll', showElement)
    }
  }, [productHighlight])

  return (
    <div
      id="content"
      // onWheel={wheelEvent}
      // onTouchStart={(e) => setTouch(e.touches[0].pageY)}
      // onTouchMove={touchEvent}
      // onTouchEnd={touchEndEvent}
      className={`section-highlight ${styles['section-highlight']}`}
    >
      <div className="container">
        <div className={styles['text-container']}>
          <div className={styles['title']}>
            <span id="highlight-title-1">
              {catHighlight.title}
            </span>
          </div>
          <div className={styles['desc']}>
            <span id="highlight-desc-1">
              {catHighlight.subtitle}
            </span>
          </div>
          <div className={`col-1 ${styles['divider']}`} />
        </div>
        <div id="highlight-video-1" className={`col-1 ${styles['video-container']}`}>
          <video autoPlay loop muted preload="auto" playsInline>
            <source src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}featureCatVideo/feature-video-1.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div id="highlight-cat" className={`col-12 ${styles['flex-container']}`}>
          <Link
            href={`/products?filterUrl=${catHighlight.cat[0].replace(/\s+/g, '-')}`}
            style={styles['item-wrapper']}
            customStyle={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_MEDIA_FOLDER}featureCatImg/cat-one.png")` }}
          >
            <div className={`container ${styles['item-name']}`}>{catHighlight.cat[0]}</div>
          </Link>
          <Link
            href={`/products?filterUrl=${catHighlight.cat[1].replace(/\s+/g, '-')}`}
            style={styles['item-wrapper']}
            customStyle={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_MEDIA_FOLDER}featureCatImg/cat-two.png")` }}
          >
            <div className={`container ${styles['item-name']}`}>{catHighlight.cat[1]}</div>
          </Link>
        </div>
        <div className={`col-12 ${styles['mobile-container']}`}>
          <div className="row">
            <MobileBox
              link={`/products?filterUrl=${catHighlight.cat[0].replace(/\s+/g, '-')}`}
              img={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}featureCatImg/cat-one.png`}
              text={catHighlight.cat[0]}
            />
            <MobileBox
              link={`/products?filterUrl=${catHighlight.cat[1].replace(/\s+/g, '-')}`}
              img={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}featureCatImg/cat-two.png`}
              text={catHighlight.cat[1]}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles['text-container']}>
          <div className={styles['title']}>
            <span id="highlight-title-2">
              {productHighlight.title}
            </span>
          </div>
          <div className={styles['desc']}>
            <span id="highlight-desc-2">
              {productHighlight.subtitle}
            </span>
          </div>
          <div className={`col-1 ${styles['divider']}`} />
        </div>
        <div id="highlight-video-2" className={`col-1 ${styles['video-container']}`}>
          <video autoPlay loop muted preload="auto" playsInline>
            <source src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}featureCatVideo/feature-video-2.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={`col-12 ${styles['images-container']}`}>
          <div className="row">
            {productHighlight?.products.map((product, i) => (
              <Link key={product.code} href={`/product/${product.code}`} style="col-4">
                <div
                  id={`highlight-item-${i + 1}`}
                  className={styles['img-box']}
                  style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(product.featureImage).replace('(', '%28').replace(')', '%29')}")` }}
                >
                  <div className={styles['img-overlay']} />
                  <span className={styles['shop-now']}>SHOP NOW</span>
                  <span className={styles['name']}>{product.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={`col-12 ${styles['mobile-container']}`}>
          <div className="row">
            {productHighlight?.products.map((product, i) => i < 2 && (
              <MobileBox
                key={product.code}
                link={`/product/${product.code}`}
                img={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(product.featureImage).replace('(', '%28').replace(')', '%29')}`}
                text={product.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
