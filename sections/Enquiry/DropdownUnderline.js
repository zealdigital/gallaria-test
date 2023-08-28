import { useEffect, useRef, useState } from 'react'

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

function DropdownUnderline({ value, label, items, setValue }) {
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)
  const [open, setOpen] = useState(false)

  useOutsideAlerter(wrapperRef, buttonRef, setOpen)

  return (
    <div className="dropdown-underline-form-wrapper">
      <div ref={buttonRef} className="dropdown-underline-form" onClick={() => setOpen(!open)}>
        <span>{value || label}</span>
        <img src="/svg/down.svg" alt="Dropdown" className={open ? 'open' : ''} />
      </div>
      <div ref={wrapperRef} className={`dropdown-underline-form-items ${open ? 'opened' : ''}`}>
        {items.map(item => !(item.name === value || item === value) && (
          <div
            key={item.name || item}
            className="item"
            onClick={() => {
              setValue(item)
              setOpen(false)
            }}
          >
            {item.name || item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownUnderline
