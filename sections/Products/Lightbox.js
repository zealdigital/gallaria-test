import styles from 'styles/modules/ProductDetail.module.scss'
import 'react-multi-carousel/lib/styles.css'

function Lightbox({ open, selected, setOpen }) {
  return (
    <div className={`${styles['lightbox']} ${open ? styles['open'] : ''}`}>
      <div className="container">
        <div>
          <a
            href=""
            className={styles['close']}
            onClick={e => {
              e.preventDefault()
              setOpen(false)
            }}
          >
            <img src="/svg/cancel.svg" alt="Close" />
          </a>
        </div>
        <div className={styles['image-gallery']}>
          <div>
            {!selected.includes('mp4') && (
              <img
                src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(selected).replace('(', '%28').replace(')', '%29')}`}
              />
            )}
            {selected.includes('mp4') && (
              <video autoPlay loop controls muted preload="auto" playsInline>
                <source src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(selected).replace('(', '%28').replace(')', '%29')}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <img src="/svg/logo-black.svg" className={styles['logo']} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
