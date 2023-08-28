import { useEffect, useState } from 'react'
import styles from 'styles/modules/Home.module.scss'

export default function HeroSection({ scrolling, setScrolling, scrollToContent, wheelHero, touchHero, setTouch, landingMedia }) {
  const [background, setBackground] = useState((landingMedia || [])[0].media)

  const showElement = () => {
    if (window.innerWidth < 767) {
      setBackground(landingMedia[1].media)
    } else {
      setBackground(landingMedia[0].media)
    }
  }

  useEffect(() => {
    if (window.innerWidth < 767) {
      setBackground(landingMedia[1].media)
    } else {
      setBackground(landingMedia[0].media)
    }

    window.addEventListener('resize', showElement)

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('resize', showElement)
    }
  }, [])

  return (
    <div
      id="hero"
      onWheel={e => {
        setScrolling(true)
        !scrolling && wheelHero(e)
      }}
      onTouchStart={(e) => setTouch(e.touches[0].pageY)}
      onTouchMove={e => {
        setScrolling(true)
        !scrolling && touchHero(e)
      }}
      style={{ backgroundImage: `url(/images/Hero-Landing.png)` }}
      className={styles['section-hero']}
    >
      {background.includes('mp4') && (
        <video autoPlay loop muted preload="auto" playsInline>
          <source src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${background}`} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}
      <div className={styles['overlay']} />
      <div className={styles['down-button']}>
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault()
            scrollToContent()
          }}
        >
          <img src="/svg/inverted-down.svg" alt="Down" />
        </a>
      </div>
    </div>
  )
}
