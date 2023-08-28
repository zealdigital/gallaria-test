import { useEffect, useState, useRef } from 'react'
import styles from 'styles/modules/ProductList.module.scss'
import { Link } from 'components'
import { XMasonry, XBlock } from 'react-xmasonry'

function List({ current, displayList, perPage }) {
  const [widthSize, setWidthSize] = useState(null)
  const masonryRef = useRef()

  function handleResize() {
    const computeThreeColumn = 0.33
    const computeTwoColumn = 0.49
    const contWidth = document.getElementById('masonry-container').offsetWidth

    let computedWidth = 500
    if (window.innerWidth > 1199) computedWidth = contWidth * computeThreeColumn
    else if (window.innerWidth <= 1199) computedWidth = contWidth * computeTwoColumn

    setWidthSize(computedWidth)
  }

  useEffect(() => {
    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setWidthSize(null)
    console.log(displayList)
  }, [displayList])

  useEffect(() => {
    if (!widthSize) handleResize()
  }, [widthSize])

  return (
    <div className={styles['section-list']}>
      <div id="masonry-container" className="container">
        {widthSize && (
          <XMasonry ref={masonryRef} center={false} maxColumns={3} targetBlockWidth={widthSize}>
            {displayList.map((d, i) => ((i >= ((current * perPage) - perPage) && i < current * perPage) && (!d.isDraft && (d.primaryImage || d.images))) && (
              <XBlock key={d.code}>
                <div className={styles['item']}>
                  <Link href={`/product/${encodeURIComponent(d.code)}`}>
                    <img src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(d.primaryImage || (d.images || [])[0])}`} />
                    <div className={styles['overlay']} />
                    <span className={styles['code']}>Code: {d.code}</span>
                    <span className={styles['name']}>{d.name}</span>
                  </Link>
                </div>
              </XBlock>
            ))}
          </XMasonry>
        )}
      </div>
    </div>
  )
}

export default List
