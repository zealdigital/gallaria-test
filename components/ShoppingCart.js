import { useContext } from 'react'
import Cookies from 'js-cookie'
import { sumBy } from 'lodash'
import { CartContext } from 'utils/cartCookie'
import { commaInNumbers } from 'utils/validation'
import Link from './Link'

function ShoppingCart({ openCart, setOpenCart }) {
  const { cartAmount, setCartAmount, shoppingCart, setShoppingCart } = useContext(CartContext)

  const removeItem = (e, i) => {
    e.preventDefault()
    const cart = JSON.parse(Cookies.get('cart'))
    cart.splice(i, 1)
    Cookies.set('cart', cart)

    setShoppingCart(JSON.parse(Cookies.get('cart')))
    setCartAmount(JSON.parse(Cookies.get('cart')).length)
  }

  return (
    <>
      <div className={`overlay${openCart ? ' open' : ''}`} onClick={() => setOpenCart(false)} />
      <div className={`shopping-cart${openCart ? ' open' : ''}`}>
        <div className="cart-title">
          <span>
            CART {cartAmount > 0 && `( ${cartAmount} )`}
          </span>
          <img src="/svg/inverted-close.svg" alt="close" onClick={() => setOpenCart(false)} />
        </div>
        <div className="blank" />
        <div className="cart-items">
          {cartAmount < 1 && (
            <span className="no-item">
              No product is added to shopping cart
            </span>
          )}
          {cartAmount > 0 && shoppingCart.map((item, i) => (
            <div key={item.code} className="item">
              <div className="image-container" onClick={() => setOpenCart(false)}>
                <Link href={`/product/${item.code}`}>
                  <img width="100%" src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(item.image).replace('(', '%28').replace(')', '%29')}`} />
                </Link>
              </div>
              <div className="text-container">
                <div className="title" onClick={() => setOpenCart(false)}>
                  <Link href={`/product/${item.code}`}>
                    {item.name}
                  </Link>
                </div>
                <div className="info">
                  AUD: {commaInNumbers(item.price)}
                  <br />
                  QTY: {item.quantity}
                </div>
                <div className="remove">
                  <a href="#" onClick={(e) => removeItem(e, i)}>
                    REMOVE
                  </a>
                  <a href="#" onClick={(e) => removeItem(e, i)}>
                    <img src="/svg/inverted-bin.svg" alt="remove" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="divider" />
        {cartAmount > 0 && (
          <div className="total-container row">
            <div className="col-6">
              SUBTOTAL:
            </div>
            <div className="col-6 value">
              AUD {commaInNumbers(sumBy(shoppingCart, item => item.price * item.quantity))}
            </div>
          </div>
        )}
        <Link href="/cart" style="button-contained white" customStyle={{ display: 'block' }}>
          VIEW CART
        </Link>
      </div>
    </>
  )
}

export default ShoppingCart
