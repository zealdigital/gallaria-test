import { useContext, createContext } from 'react'

export function EnquiryNumber({ invert }) {
  const { enquiryAmount } = useContext(EnquiryContext)

  return (
    <span className={`cart-number${invert ? ' inverted' : ''}`} style={{ transform: 'translate(-46%, -45%)' }}>
      {enquiryAmount}
    </span>
  )
}

export const EnquiryContext = createContext()
