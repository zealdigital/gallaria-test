import { useContext, createContext } from 'react'

export function CartNumber({ invert }) {
  const { cartAmount } = useContext(CartContext)

  return (
    <span className={`cart-number${invert ? ' inverted' : ''}`} style={{ transform: 'translate(200%, -100%)' }}>
      {cartAmount}
    </span>
  )
}

export const CartContext = createContext()
