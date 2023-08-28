import { useEffect, useRef, useState, Fragment } from 'react'
import styles from 'styles/modules/ProductList.module.scss'

function useOutsideAlerter(ref, buttonRef, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      // eslint-disable-next-line
      if (buttonRef.current.contains(event.target)) return
      else if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

function Filter({ selected, setSelected }) {
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)
  const [open, setOpen] = useState(false)

  useOutsideAlerter(wrapperRef, buttonRef, setOpen)

  const variants = [
    { name: 'DEFAULT', value: 'default' },
    { name: 'A - Z', value: 'name:asc' },
    { name: 'Z - A', value: 'name:desc' },
    { name: 'DATE:  NEW - OLD', value: 'date:desc' },
    { name: 'DATE:  OLD - NEW', value: 'date:asc' }
  ]

  return (
    <>
      <div className={styles['sorting']}>
        <div ref={buttonRef} className={`${styles['sorting-button']}${open ? ` ${styles['opened']}` : ''}`} onClick={() => setOpen(!open)}>
          <span>
            SORT BY:
          </span>
          <span>
            {selected.name}
            <img src="/svg/down.svg" alt="Dropdown" className={open ? 'open' : ''} />
          </span>
        </div>
        <div ref={wrapperRef} className={`${styles['dropdown-items']}${open ? ` ${styles['opened']}` : ''}`}>
          {variants.map(variant => variant.name !== selected.name && (
            <Fragment key={variant.name}>
              <div
                className={styles['item']}
                onClick={() => {
                  setOpen(false)
                  setSelected(variant)
                }}
              >
                <span>
                  {variant.name}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export default Filter
