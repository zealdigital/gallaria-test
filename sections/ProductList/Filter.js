import { useEffect, useState, Fragment } from 'react'
import { findIndex } from 'lodash'
import styles from 'styles/modules/ProductList.module.scss'

function Filter({ categories, setFilter, selection, setFilterOff }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  return (
    <>
      <div className={`${styles['backdrop']}${open ? ` ${styles['opened']}` : ''}`} onClick={() => setOpen(false)} />
      <div className={styles['filter']}>
        <div className={`${styles['filter-button']}${open ? ` ${styles['opened']}` : ''}`} onClick={() => setOpen(!open)}>
          <div className={`${styles['burger']}${open ? ` ${styles['opened']}` : ''}`}>
            <div />
          </div>
          <span>FILTER</span>
        </div>
        <div className={`${styles['dropdown-items']}${open ? ` ${styles['opened']}` : ''}`}>
          <div className={styles['dropdown-header']}>
            <div className={`${styles['burger']}${open ? ` ${styles['opened']}` : ''}`}>
              <div />
            </div>
            <span>FILTER</span>
            {/* eslint-disable-next-line */}
            <a
              href="#"
              className={styles['close']}
              onClick={e => {
                e.preventDefault()
                setOpen(false)
              }}
            />
          </div>
          <span className={styles['title']}>CATEGORIES</span>
          <div className={styles['title-underline']} />
          {categories.map(({ name, id, sub, series }) => {
            const [openSub, setOpenSub] = useState(false)

            return (
              <Fragment key={name}>
                <div
                  className={styles['item']}
                  onClick={() => {
                    const subId = sub.map(s => s.id)
                    const seriesId = series.map(s => s.id)
                    setFilter(id)
                    setFilterOff([...subId, ...seriesId])
                  }}
                >
                  <span className={selection.includes(id) ? styles['selected'] : ''}>
                    {name}
                  </span>
                  {sub.length > 0 && (() => (
                    <span
                      className={`${selection.includes(id) ? styles['selected'] : ''} ${openSub ? styles['minus'] : styles['plus']}`}
                      onClick={e => {
                        e.stopPropagation()
                        setOpenSub(!openSub)
                      }}
                    >
                      {openSub ? '-' : '+'}
                    </span>
                  ))()}
                </div>
                {sub.map(s => {
                  const [openSeries, setOpenSeries] = useState(false)

                  return (
                    <Fragment key={s.name}>
                      <div
                        className={`${styles['sub-item']}${openSub ? ` ${styles['sub-item-open']}` : ''}`}
                        onClick={() => {
                          const seriesId = series.map(se => se.id)
                          setFilter(s.id)
                          setFilterOff([id, ...seriesId])
                        }}
                      >
                        <span
                          className={(selection.includes(s.id) || selection.includes(id)) ? styles['selected'] : ''}
                        >
                          {s.name}
                        </span>
                        {(findIndex(series, ['sub', s.name]) > -1) && (
                          <span
                            className={`${(selection.includes(s.id) || selection.includes(id)) ? styles['selected'] : ''} ${openSeries ? styles['minus'] : styles['plus']}`}
                            onClick={e => {
                              e.stopPropagation()
                              setOpenSeries(!openSeries)
                            }}
                          >
                            {openSeries ? '-' : '+'}
                          </span>
                        )}
                      </div>
                      {(series || []).map(item => item.sub === s.name && (
                        <div
                          key={item.name}
                          className={`${styles['series-item']}${(openSeries && openSub) ? ` ${styles['series-item-open']}` : ''}`}
                          onClick={() => {
                            setFilter(item.id)
                            setFilterOff([id, s.id])
                          }}
                        >
                          <span className={(selection.includes(s.id) || selection.includes(item.id) || selection.includes(id)) ? styles['selected'] : ''}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </Fragment>
                  )
                })}
              </Fragment>
            )
          })}
          <div
            className={styles['reset']}
            onClick={() => {
              setFilter('all')
              setOpen(false)
            }}
          >
            CLEAR FILTER
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter
