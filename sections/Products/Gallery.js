import { Fragment } from 'react'
import Carousel from 'react-multi-carousel'
import styles from 'styles/modules/ProductDetail.module.scss'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 960 },
    items: 4,
    slidesToSlide: 4
  },
  tablet: {
    breakpoint: { max: 959, min: 372 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 371, min: 0 },
    items: 2,
    slidesToSlide: 2
  }
}

function Gallery({ data, selected, setSelected, setOpen }) {
  const { images } = data

  return (
    <div className={`col-lg-6 ${styles['section-gallery']}`}>
      <div>
        <div className={styles['selected-image']} onClick={() => setOpen(true)}>
          {!selected.includes('mp4') && (
            <img width="100%" src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(selected).replace('(', '%28').replace(')', '%29')}`} />
          )}
          {selected.includes('mp4') && (
            <video autoPlay loop muted preload="auto" playsInline>
              <source src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(selected).replace('(', '%28').replace(')', '%29')}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className={styles['image-gallery']}>
          <Carousel
            responsive={responsive}
            ssr={true}
          >
            {images.map(image => (
              <Fragment key={image}>
                {!image.includes('mp4') && (
                  <div
                    key={image}
                    onClick={() => setSelected(image)}
                    className={`${(selected === image) ? styles['selected'] : ''}`}
                    style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(image).replace('(', '%28').replace(')', '%29')})` }}
                  />
                )}
                {image.includes('mp4') && (
                  <div className={styles['video-thumbnail']} onClick={() => setSelected(image)}>
                    <video
                      id={`${image}-video`}
                      muted
                      preload="auto"
                      playsInline
                    >
                      <source src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(image).replace('(', '%28').replace(')', '%29')}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className={styles['video-overlay']} />
                  </div>
                )}
              </Fragment>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Gallery
